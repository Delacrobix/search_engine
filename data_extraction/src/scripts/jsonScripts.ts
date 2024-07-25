import * as fs from "fs/promises";
import path from "path";

import {
  AccessTokenResponse,
  JsonIds,
  QueriesPerType,
  TokenData,
} from "../utils/types";

export async function getQueries(): Promise<QueriesPerType> {
  const queriesFilePath = path.join(__dirname, "../../data/searchQueries.json");

  try {
    const data = await fs.readFile(queriesFilePath, "utf-8");
    const queries = await JSON.parse(data);

    return queries;
  } catch (error) {
    throw new Error("Error reading queries file: " + error);
  }
}

export async function registerQueryInFiles(
  query: string,
  type: string
): Promise<void> {
  const queriesFilePath = path.join(__dirname, "../../data/searchQueries.json");
  const searchedQueriesPath = path.join(
    __dirname,
    "../../data/searchedQueries.json"
  );

  let queryFileData = "";
  let searchedQueriesData = "";

  try {
    queryFileData = await fs.readFile(queriesFilePath, "utf-8");
    searchedQueriesData = await fs.readFile(searchedQueriesPath, "utf-8");
  } catch (error) {
    console.error("Error reading file: ", error);
  }

  let queries = null;
  let searchedQueries = null;

  try {
    queries = await JSON.parse(queryFileData);
    searchedQueries = await JSON.parse(searchedQueriesData);
  } catch (error) {
    console.error("Error parsing JSON: ", error);
  }

  const queriesOfType = queries[type];
  const searchedQueriesOfType = searchedQueries[type];

  queries[type] = queriesOfType?.queries.filter((q: string) => q !== query);
  searchedQueries[type] = searchedQueriesOfType?.queries.push(query);

  const updatedQueries = JSON.stringify(queries, null, 2);
  const updatedSearchedQueries = JSON.stringify(searchedQueries, null, 2);

  try {
    await fs.writeFile(queriesFilePath, updatedQueries, "utf-8");
    await fs.writeFile(searchedQueriesPath, updatedSearchedQueries, "utf-8");
  } catch (error) {
    console.error("Error writing file: ", error);
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function registerIdsInFile(
  filePath: string,
  type: string,
  id: string
): Promise<void> {
  if (!(await fileExists(filePath))) {
    const auxJson: JsonIds = {
      track: [],
      album: [],
      playlist: [],
      artist: [],
      show: [],
      episode: [],
      audiobook: [],
    };

    await fs.writeFile(filePath, JSON.stringify(auxJson, null, 2), "utf-8");
  }

  try {
    const data = await fs.readFile(filePath, "utf-8");

    const jsonIds: JsonIds = JSON.parse(data);
    jsonIds[type]?.push(id);
    const updatedData = JSON.stringify(jsonIds, null, 2);

    await fs.writeFile(filePath, updatedData, "utf-8");
  } catch (error) {
    console.error("Error writing o reading file: ", error);
  }
}

export async function getTokenData(): Promise<TokenData> {
  const tokenPath = path.join(__dirname, "../../data/token.json");

  if (!(await fileExists(tokenPath))) {
    console.log("Creating token file...");

    await fs.writeFile(
      tokenPath,
      JSON.stringify({ token: "", expirationDate: 0, type: "" }, null, 2),
      "utf-8"
    );
  }

  try {
    const data = await fs.readFile(tokenPath, "utf-8");
    const tokenData: TokenData = JSON.parse(data);

    return tokenData;
  } catch (error) {
    throw new Error("Error reading token file: " + error);
  }
}

export async function saveTokenData(data: AccessTokenResponse): Promise<void> {
  const tokenPath = path.join(__dirname, "../../data/token.json");

  if (!(await fileExists(tokenPath))) {
    console.log("Creating token file...");

    await fs.writeFile(
      tokenPath,
      JSON.stringify({ token: "", expirationDate: 0, type: "" }, null, 2),
      "utf-8"
    );
  }

  try {
    await fs.writeFile(
      tokenPath,
      JSON.stringify(
        {
          token: data.access_token,
          expirationDate: calculateExpirationTime(data.expires_in),
          type: data.token_type,
        },
        null,
        2
      ),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing file: ", error);
  }
}

async function calculateExpirationTime(
  secondsForExpire: number
): Promise<number> {
  const now = new Date();
  const expireTime = new Date(now.getTime() + secondsForExpire * 1000);

  return expireTime.getTime();
}

export async function saveData(
  data: any,
  type: string,
  name: string
): Promise<void> {
  const dirPath = path.join(__dirname, `../../data/extractedData/${type}`);

  await fs.mkdir(dirPath, { recursive: true });

  const consolidatedQuery = name.replace(" ", "_");

  const filePath = path.join(dirPath, `${consolidatedQuery}.json`);
  const dataString = JSON.stringify(data, null, 2);

  try {
    await fs.writeFile(filePath, dataString, "utf-8");
    console.log(`Data saved for type: ${type}, name: ${name} in ${filePath}`);
  } catch (error) {
    console.error("Error writing file: ", error);
  }
}
