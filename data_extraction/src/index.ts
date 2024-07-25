import getAccessToken from "./scripts/getAccessToken";

import {
  getQueries,
  getTokenData,
  registerQueryInFiles,
  saveData,
} from "./scripts/jsonScripts";
import { QueriesPerType, TokenData } from "./utils/types";
import { searchData } from "./scripts/requests";

async function main() {
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

  const allQueries: QueriesPerType = await getQueries();

  /**
   * The type of data to search for.
   *
   * POSSIBLE_VALUES: "track", "album", "playlist", "artist", "show", "episode", "audiobook"
   */
  const type = "artist";
  const queries = allQueries[type];

  if (!queries) {
    console.error("No queries found for type: " + type);
    return;
  }

  console.log("Searching queries in the API...");

  queries?.queries.forEach(async (query) => {
    const data = await searchData(type, query, 50, "audio", token);

    if (data === 401) {
      console.error("Invalid token or expired token");
      return;
    }

    if (data !== null) {
      await registerQueryInFiles(query, type);

      //TODO: Save IDS when searching tracks, albums, etc.

      await saveData(data, "query", query);
    }
  });
}

main();
