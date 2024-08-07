import {
  getAllJsonFilesNamesFromFolder,
  getJsonData,
  saveData,
} from "./scripts/jsonScripts";

async function main() {
  const filesNamesArr = await getAllJsonFilesNamesFromFolder(
    `extractedData/album`
  );

  for (const fileName of filesNamesArr) {
    const jsonData = await getJsonData(`extractedData/album/${fileName}`);

    if (!jsonData) continue;

    const newJson = formatData(jsonData);

    await saveData(newJson, "formatted", fileName);
  }
}

function formatData(jsonData: any) {
  const newJson = { ...jsonData };

  delete newJson.href;
  delete newJson.uri;

  const tracks = newJson.tracks.items;
  const artists = newJson.artists;

  for (let artist of artists) {
    delete artist.href;
    delete artist.uri;
  }

  for (let track of tracks) {
    const artists = track.artists;

    for (let artist of artists) {
      delete artist.href;
      delete artist.uri;
    }

    delete track.href;
    delete track.uri;
  }

  newJson.tracks = tracks;

  return newJson;
}

main();
