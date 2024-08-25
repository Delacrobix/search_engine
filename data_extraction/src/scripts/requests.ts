/**
 * Searches for data in the Spotify API using the search endpoint.
 * @param type - The type of data to search for.
 * @param query - The search query.
 * @param limit - The maximum number of results to return; This must be a number from 1 to 50.
 * @param includeExternal - Indicates whether to include external sources in the search results.
 * @param token - The access token for authentication.
 * @returns A Promise that resolves to the search results.
 */
export async function searchData(
  type: string,
  query: string,
  limit: number,
  includeExternal: string,
  token: string
): Promise<any> {
  const urlParams = new URLSearchParams({
    q: query,
    type: type,
    limit: limit.toString(),
    include_external: includeExternal,
  });

  let response = null;

  try {
    response = await fetch(`https://api.spotify.com/v1/search?${urlParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await responseHandler(response);

    const data = await response.json();
    const key = Object.keys(data)[0];

    return data[key];
  } catch (e) {
    console.error("Error searching data: " + e);
  }
}

/**
 * Retrieves data by ID per type from the Spotify API.
 * @param type - The type of data to retrieve (e.g., 'album', 'artist', 'track').
 * @param id - The ID of the data to retrieve.
 * @param token - The access token for authentication.
 * @returns A Promise that resolves to the retrieved data.
 */
export async function getDataByIdPerType(
  type: string,
  id: string,
  token: string
): Promise<any> {
  try {
    const response = await fetch(`https://api.spotify.com/v1/${type}s/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseStatus = await responseHandler(response);

    if (responseStatus === 1) return await response.json();
    else return responseStatus;
  } catch (e) {
    console.error("Error getting data per type: " + e);
    return null;
  }
}

async function responseHandler(response: Response): Promise<number> {
  if (response.status === 401) {
    console.error("Invalid token or expired token");
    return response.status;
  }

  if (response.status === 429) {
    console.error("Rate limit exceeded");
    return response.status;
  }

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return 0;
  }

  return 1;
}
