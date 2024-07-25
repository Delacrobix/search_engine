import dotenv from "dotenv";
import { saveTokenData } from "./jsonScripts";
dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID ?? "";
const secret = process.env.SPOTIFY_CLIENT_SECRET ?? "";

/**
 * Retrieves an access token from the Spotify API.
 * @returns {Promise<{ accessToken: string, expiresIn: number }>} The access token and its expiration time.
 * @throws {Error} If there is an error retrieving the access token.
 */
export default async function getAccessToken(): Promise<string | null> {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: secret,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const result = await decodeResponse(response);
    await saveTokenData(result);

    return result.access_token;
  } catch (e) {
    console.error("Error getting access token: " + e);
    return null;
  }
}

async function decodeResponse(response: Response): Promise<any> {
  try {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) {
      throw new Error("Error getting access token: No reader");
    }

    let done = false;
    let result = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      result += decoder.decode(value, { stream: !done });
    }

    return JSON.parse(result);
  } catch (e) {
    throw new Error(`Error decoding data: ${e}`);
  }
}
