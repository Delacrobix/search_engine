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

  const response = await fetch(
    `https://api.spotify.com/v1/search?${urlParams}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error searching data: " + response.statusText);
  }

  if (response.status === 401) {
    console.error("Invalid token or expired token");

    return 401;
  }

  if (response.status === 429) {
    throw new Error("Rate limit exceeded");
  }

  const data = await response.json();

  const key = Object.keys(data)[0];
  return data[key];
}
