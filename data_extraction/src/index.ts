import * as readline from "readline";

import getAccessToken from "./scripts/getAccessToken";
import {
  getAllJsonFilesNamesFromFolder,
  getJsonData,
  getTokenData,
  registerQueryInFiles,
  saveData,
  setJsonData,
} from "./scripts/jsonScripts";
import { getDataByIdPerType, searchData } from "./scripts/requests";
import {
  extractIdsFromAlbumData,
  formatAlbumData,
  formatArtistData,
  formatTrackData,
  isDataAlreadyRetrieved,
  isIdInRequestsQueue,
} from "./utils/indexFunctions";
import { QueriesPerType, RequestQueue, TokenData } from "./utils/types";
import { bulkIndexDocuments, deleteIndex } from "./scripts/elasticRequests";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let token = "";

(async () => {
  token = await getToken();
  await promptUser();
})();

async function enqueueRequests(token: string): Promise<void> {
  const albumFileNamesArr = await getAllJsonFilesNamesFromFolder(
    `extractedData/album`
  );

  for (const fileName of albumFileNamesArr) {
    const albumData = await getJsonData(`extractedData/album/${fileName}`);

    const ids: any = await extractIdsFromAlbumData(albumData);
    if (ids.length === 0) continue;

    const requestsQueue: RequestQueue[] = await getJsonData(
      "requestsQueue.json"
    );
    let aux = 0;

    for (const id of ids) {
      const dataExist = await isDataAlreadyRetrieved(id.type, id.id);

      if (!dataExist) {
        const idInQueue = await isIdInRequestsQueue(id.id, requestsQueue);

        if (!idInQueue) {
          aux++;
          requestsQueue.push({
            type: id.type,
            id: id.id,
          });
        }
      }
    }

    if (aux > 0) await setJsonData("requestsQueue.json", requestsQueue);
  }

  const requestsQueue: RequestQueue[] = await getJsonData("requestsQueue.json");

  console.log("requestsQueue len: ", requestsQueue.length);
}

async function executeRequestsQueue(token: string): Promise<void> {
  console.log("Executing requests queue...");

  const requestsQueue: RequestQueue[] = await getJsonData("requestsQueue.json");
  const newRequestsQueue: RequestQueue[] = [...requestsQueue];

  let errorCount = 0;
  let successfullyExecutions = 0;

  for (const request of requestsQueue) {
    const data = await getDataByIdPerType(request.type, request.id, token);

    if (data) {
      if (typeof data === "number") {
        errorCount++;
      } else {
        successfullyExecutions++;
        await saveData(data, request.type, request.id);

        console.log(
          `Data for ID: ${request.id} and type: ${request.type} saved`
        );

        newRequestsQueue.splice(newRequestsQueue.indexOf(request), 1);
      }
    }

    if (errorCount > 10) {
      console.error("Too many errors, exiting...");
      break;
    }
  }

  await setJsonData("requestsQueue.json", newRequestsQueue);

  console.log("Successfully executed requests: ", successfullyExecutions);
  console.log("Remaining requests: ", newRequestsQueue.length);
  console.log("Requests queue process finished.");
}

async function searchQueries(token: string): Promise<void> {
  const allQueries: QueriesPerType = await getJsonData("searchQueries.json");
  const keys = Object.keys(allQueries);

  for (const key of keys) {
    const queries = allQueries[key]?.queries;

    if (queries?.length === 0 || !queries) {
      console.error("No queries found for type: " + key);
      continue;
    }

    console.log("Searching queries in the API...");

    for (const query of queries) {
      const data = await searchData("album", query, 50, "audio", token);

      if (data) {
        await registerQueryInFiles(query, key);
        await saveData(data, "album", query);
      }
    }
  }
}

async function formatDataOption(): Promise<any> {
  const albumNamesArr = await getAllJsonFilesNamesFromFolder(
    `extractedData/album`
  );

  const artistsNamesArr = await getAllJsonFilesNamesFromFolder(
    `extractedData/artist`
  );

  const tracksNamesArr = await getAllJsonFilesNamesFromFolder(
    `extractedData/track`
  );

  for (const fileName of albumNamesArr) {
    const jsonData = await getJsonData(`extractedData/album/${fileName}`);

    if (!jsonData) continue;

    const newJson = formatAlbumData(jsonData);
    await saveData(newJson, "formatted/albums", fileName);
  }

  for (const fileName of artistsNamesArr) {
    const jsonData = await getJsonData(`extractedData/artist/${fileName}`);

    if (!jsonData) continue;

    const newJson = formatArtistData(jsonData);
    await saveData(newJson, "formatted/artists", fileName);
  }

  for (const fileName of tracksNamesArr) {
    const jsonData = await getJsonData(`extractedData/track/${fileName}`);

    if (!jsonData) continue;

    const newJson = formatTrackData(jsonData);
    await saveData(newJson, "formatted/tracks", fileName);
  }
}

async function updateElasticSearchCluster(): Promise<void> {
  await deleteIndex("spotify-albums");
  await deleteIndex("spotify-artists");
  await deleteIndex("spotify-tracks");

  const albumFileNamesArr = await getAllJsonFilesNamesFromFolder(
    "extractedData/formatted/albums"
  );

  const artistsFileNamesArr = await getAllJsonFilesNamesFromFolder(
    "extractedData/formatted/artists"
  );

  const tracksFileNamesArr = await getAllJsonFilesNamesFromFolder(
    "extractedData/formatted/tracks"
  );

  const albumsData = await Promise.all(
    albumFileNamesArr.map(async (fileName) => {
      return await getJsonData(`extractedData/formatted/albums/${fileName}`);
    })
  );

  const artistsData = await Promise.all(
    artistsFileNamesArr.map(async (fileName) => {
      return await getJsonData(`extractedData/formatted/artists/${fileName}`);
    })
  );

  const tracksData = await Promise.all(
    tracksFileNamesArr.map(async (fileName) => {
      return await getJsonData(`extractedData/formatted/tracks/${fileName}`);
    })
  );
  console.log("tracksData: ", tracksData);

  await bulkIndexDocuments("spotify-tracks", tracksData);
  await bulkIndexDocuments("spotify-albums", albumsData);
  await bulkIndexDocuments("spotify-artists", artistsData);
}

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

  console.log("Token retrieved successfully");
  return token;
}

async function handleOption(option: string): Promise<void> {
  switch (option) {
    case "1":
      await searchQueries(token);
      break;
    case "2":
      await enqueueRequests(token);
      break;
    case "3":
      await executeRequestsQueue(token);
      break;
    case "4":
      await formatDataOption();
      break;
    case "5":
      await updateElasticSearchCluster();
      break;
    case "6":
      console.log("Exiting...");
      rl.close();
      return;
    default:
      console.log("Invalid option, please try again.");
  }

  await promptUser();
}

async function promptUser(): Promise<void> {
  showMenu();
  rl.question("\nSelect an option: ", handleOption);
}

function showMenu(): void {
  console.log("\n -------- Process to execute ---------\n");
  const menuOptions = [
    "Search queries",
    "Enqueue requests",
    "Execute requests queue",
    "format data",
    "Update to ElasticSearch Cluster",
    "Exit",
  ];

  menuOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
}
