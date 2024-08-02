import getAccessToken from "./scripts/getAccessToken";

import {
  deleteIdFromFile,
  getAllJsonFilesNamesFromFolder,
  getJsonData,
  getTokenData,
  registerIdsInFile,
  registerQueryInFiles,
  saveData,
} from "./scripts/jsonScripts";
import { JsonIds, QueriesPerType, TokenData } from "./utils/types";
import { getDataByIdPerType, searchData } from "./scripts/requests";

async function main() {
  const token = await getToken();

  await searchQueries(token);
  //TODO: extract artist IDs

  const iterationArr = ["query", "album", "track"];

  for (const type of iterationArr) {
    await retrieveDataByIds(token, type);
  }
}

main();

async function getToken(): Promise<string> {
  /**
   * Looking for token validity. If the token is not valid, it will get a new one.
   */
  let tokenData: TokenData = await getTokenData();
  let token = "";

  if (tokenData.expirationDate < Date.now() || tokenData.token === "") {
    while (true) {
      console.log("Getting access token...");
      const response = await getAccessToken();

      if (response) {
        token = response;

        break;
      }
    }
  } else {
    token = tokenData.token;
  }

  return token;
}

async function searchQueries(token: string): Promise<void> {
  const allQueries: QueriesPerType = await getJsonData("searchQueries.json");
  const keys = Object.keys(allQueries);

  for (const key of keys) {
    const queries = allQueries[key]?.queries;

    if (!queries) {
      console.error("No queries found for type: " + key);
      continue;
    }

    console.log("Searching queries in the API...");

    for (const query of queries) {
      const data = await searchData("album", query, 50, "audio", token);

      if (data) {
        await registerQueryInFiles(query, key);
        await saveData(data, "query", query);
      }
    }
  }
}

async function retrieveDataByIds(token: string, type: string): Promise<void> {
  await retrieveIdsFromFiles(type);

  /**
   * Getting data per id and type and saving it in the corresponding file.
   */
  let idsData: JsonIds = await getJsonData("ids.json");
  let completedIds: JsonIds = await getJsonData("completedIds.json");

  const idsKeys = Object.keys(idsData);

  for (const key of idsKeys) {
    const ids = idsData[key];
    const completedIdsArr = completedIds[key];

    if (!ids) {
      console.error("No ids found for type: " + key);
      continue;
    }

    console.log(`Searching data for type ${key}...`);

    for (const id of ids) {
      if (completedIdsArr?.includes(id)) {
        console.log(`ID data ${id} already retrieved`);
        continue;
      }

      let data = null;

      data = await getDataByIdPerType(key, id, token);

      if (data) {
        await saveData(data, key, id);

        // Updating the completedIds.json file and deleting the id from the ids.json file
        await registerIdsInFile("completedIds.json", key, id);
        await deleteIdFromFile("ids.json", key, id);

        completedIds = await getJsonData("completedIds.json");
        idsData = await getJsonData("ids.json");
      }
    }
  }
}

async function retrieveIdsFromFiles(type: string): Promise<void> {
  const filesNamesArr = await getAllJsonFilesNamesFromFolder(
    `extractedData/${type}`
  );

  for (const fileName of filesNamesArr) {
    const jsonData = await getJsonData(`extractedData/${type}/${fileName}`);

    let items = null;

    if (type === "query") {
      items = jsonData?.items;
    } else if (type === "album") {
      items = jsonData?.tracks?.items;
    }

    if (!items) continue;

    for (const item of items) {
      const id = item.id;
      const type = item.type;

      const completedIds: JsonIds = await getJsonData("completedIds.json");

      if (completedIds[type]?.includes(id)) {
        console.log(`ID data ${id} already retrieved`);
        continue;
      }

      await registerIdsInFile("ids.json", type, id);
    }
  }
}

//TODO: Delete fields: href, uri
//TODO: Refactor followers field for artists. Just put the number of followers (followers: 100)
// TODO: Refactor tracks field for albums. Just put the array of tracks
