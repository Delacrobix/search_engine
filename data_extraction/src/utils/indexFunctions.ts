import { getAllJsonFilesNamesFromFolder } from "../scripts/jsonScripts";
import { RequestQueue } from "./types";

export function formatAlbumData(jsonData: any) {
  const newJson = { ...jsonData };

  delete newJson.href;
  delete newJson.uri;

  const MIN_POSITIVE_FLOAT = 1.17549435e-38;

  if (newJson.popularity === 0) newJson.popularity = MIN_POSITIVE_FLOAT;

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
  setupHavePreviewUrl(newJson);

  return newJson;
}

export function formatArtistData(jsonData: any) {
  const newJson = { ...jsonData };

  delete newJson.href;
  delete newJson.uri;

  const MIN_POSITIVE_FLOAT = 1.17549435e-38;

  if (newJson.popularity === 0) newJson.popularity = MIN_POSITIVE_FLOAT;

  return newJson;
}

export function formatTrackData(jsonData: any) {
  const newJson = { ...jsonData };

  delete newJson.href;
  delete newJson.uri;

  const MIN_POSITIVE_FLOAT = 1.17549435e-38;

  if (newJson.popularity === 0) newJson.popularity = MIN_POSITIVE_FLOAT;

  const album = newJson.album;

  delete album.href;
  delete album.uri;

  const albumArtists = album.artists;

  for (let artist of albumArtists) {
    delete artist.href;
    delete artist.uri;
  }

  const artists = newJson.artists;

  for (let artist of artists) {
    delete artist.href;
    delete artist.uri;
  }

  return newJson;
}

export async function isIdInRequestsQueue(
  id: string,
  requestQueue: RequestQueue[]
): Promise<boolean> {
  for (const request of requestQueue) {
    if (request.id === id) {
      console.log(`- ID ${id} already in the requests queue`);
      return true;
    }
  }

  return false;
}

export async function extractIdsFromAlbumData(
  albumData: any
): Promise<object[]> {
  const ids: any[] = [];

  for (const track of albumData.tracks.items) {
    for (const artist of track.artists) {
      ids.push({ type: "artist", id: artist.id });
    }

    ids.push({ type: "track", id: track.id });
  }

  for (const artist of albumData.artists) {
    if (ids.find((e) => e.id === artist.id)) continue;

    ids.push({ type: "artist", id: artist.id });
  }

  return ids;
}

export async function isDataAlreadyRetrieved(
  type: string,
  id: string
): Promise<boolean> {
  const filesNamesArr = await getAllJsonFilesNamesFromFolder(
    `extractedData/${type}`
  );

  if (!filesNamesArr) return false;

  if (filesNamesArr.includes(`${id}.json`)) {
    console.log(`- Data for ID: ${id} and for type: ${type} already retrieved`);
    return true;
  }

  return false;
}

function setupHavePreviewUrl(data: any): void {
  const tracks = data.tracks;
  let hasPreviewUrl = false;

  for (let track of tracks) {
    if (track.preview_url) {
      hasPreviewUrl = true;
    }
  }

  data.have_preview_url = hasPreviewUrl ? "true" : "false";
}
