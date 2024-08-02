import * as fs from "fs/promises";
import path from "path";

import { AccessTokenResponse, JsonIds, TokenData } from "../utils/types";

/**
 * Reads a JSON file and returns its parsed content.
 * @param filePath - The path to the JSON file in the data directory.
 * @returns A promise that resolves to the parsed JSON data.
 * @throws If there is an error reading the file or parsing the JSON.
 */
export async function getJsonData(filePath: string): Promise<any> {
  const joinedFilePath = path.join(__dirname, "..", "..", "data", filePath);

  try {
    const data = await fs.readFile(joinedFilePath, "utf-8");
    const parsedData = await JSON.parse(data);

    return parsedData;
  } catch (error) {
    throw new Error("Error reading queries file: " + error);
  }
}

export async function registerQueryInFiles(
  query: string,
  type: string
): Promise<void> {
  const queriesFilePath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "searchQueries.json"
  );
  const searchedQueriesPath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "searchedQueries.json"
  );

  let queries = null;
  let searchedQueries = null;

  try {
    const [queryFileData, searchedQueriesData] = await Promise.all([
      fs.readFile(queriesFilePath, "utf-8"),
      fs.readFile(searchedQueriesPath, "utf-8"),
    ]);

    queries = await JSON.parse(queryFileData || "{}");
    searchedQueries = await JSON.parse(searchedQueriesData || "{}");
  } catch (error) {
    console.error("Error reading or parsing file: ", error);
    return;
  }

  const queriesOfType = queries[type];
  const searchedQueriesOfType = searchedQueries[type];

  // Extracting searched query from the queries arr
  queriesOfType.queries = queriesOfType?.queries.filter(
    (q: string) => q !== query
  );

  // Adding searched query to the searched queries arr
  searchedQueriesOfType?.queries.push(query);

  queries[type] = queriesOfType;
  searchedQueries[type] = searchedQueriesOfType;

  try {
    const updatedQueries = JSON.stringify(queries, null, 2);
    const updatedSearchedQueries = JSON.stringify(searchedQueries, null, 2);

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
  fileName: string,
  type: string,
  id: string
): Promise<void> {
  const filePath = path.join(__dirname, "..", "..", "data", fileName);

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

    const jsonIds: JsonIds = await JSON.parse(data);
    jsonIds[type]?.push(id);

    const updatedData = JSON.stringify(jsonIds, null, 2);
    await fs.writeFile(filePath, updatedData, "utf-8");
  } catch (error) {
    console.error("Error writing o reading file: ", error);
  }
}

export async function deleteIdFromFile(
  fileName: string,
  type: string,
  id: string
): Promise<void> {
  const filePath = path.join(__dirname, "..", "..", "data", fileName);

  if (!(await fileExists(filePath))) {
    console.error(`File ${fileName} does not exist.`);
    return;
  }

  try {
    const data = await fs.readFile(filePath, "utf-8");

    const jsonIds: JsonIds = await JSON.parse(data);
    const ids = jsonIds[type];

    if (!ids) {
      console.error(`Type ${type} does not exist in ${fileName}.`);
      return;
    }

    const updatedIds = ids.filter((i: string) => i !== id);
    jsonIds[type] = updatedIds;

    const updatedData = JSON.stringify(jsonIds, null, 2);
    await fs.writeFile(filePath, updatedData, "utf-8");
  } catch (error) {
    console.error("Error writing o reading file: ", error);
  }
}

export async function getTokenData(): Promise<TokenData> {
  const tokenPath = path.join(__dirname, "..", "..", "data", "token.json");

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

/**
 * Retrieves the names of all JSON files from a specified folder path.
 * @param folderPath - The path to the folder containing the JSON files in the data directory.
 * @returns A promise that resolves to an array of strings representing the names of the JSON files.
 */
export async function getAllJsonFilesNamesFromFolder(
  folderPath: string
): Promise<string[]> {
  const joinedPath = path.join(__dirname, "..", "..", "data", folderPath);

  if (!(await fileExists(joinedPath))) {
    console.log(`Creating folder ${folderPath}...`);
    await fs.mkdir(joinedPath, { recursive: true });
  }

  return await fs.readdir(joinedPath);
}

export async function saveTokenData(data: AccessTokenResponse): Promise<void> {
  const tokenPath = path.join(__dirname, "..", "..", "data", "token.json");

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
          expirationDate: await calculateExpirationTime(data.expires_in),
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

/**
 * Saves the data to a JSON file in a folder named after the type of data.
 *
 * @param data - The data to be saved.
 * @param type - The type of data being saved. This will be the name of the folder where the data will be saved in the data/extractedData directory.
 * @param name - The name of the data being saved.
 * @returns A promise that resolves when the data is saved.
 */
export async function saveData(
  data: any,
  type: string,
  name: string
): Promise<void> {
  const dirPath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "extractedData",
    type
  );

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
