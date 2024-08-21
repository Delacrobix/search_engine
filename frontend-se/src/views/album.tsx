import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EuiAccordion,
  EuiCard,
  EuiImage,
  EuiPanel,
  EuiText,
  useGeneratedHtmlId,
} from "@elastic/eui";

import { Album as AlbumType, Artist } from "../types/types";
import { formatDate } from "../utils/functions";

const ELASTIC_ENDPOINT =
  import.meta.env.VITE_ELASTIC_ENDPOINT || "http://localhost:9200";

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const noArrowAccordionId = useGeneratedHtmlId({ prefix: "noArrowAccordion" });

  const [albumData, setAlbumData] = useState<AlbumType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlbumData() {
      try {
        const response = await fetch(
          `${ELASTIC_ENDPOINT}/spotify-albums/_search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: {
                match: {
                  _id: id,
                },
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data: ", data.hits.hits[0]._source);
        setAlbumData(data.hits.hits[0]._source);
      } catch (error) {
        setError("Failed to fetch album data");
      } finally {
        setLoading(false);
      }
    }

    fetchAlbumData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=' min-h-screen flex flex-col items-center justify-center'>
      <div className='w-full md:w-[60%] lg:w-[50%]'>
        <EuiCard
          className='m-2'
          description={
            <a target='_blank' href={albumData?.external_urls?.spotify}>
              Look album in Spotify
            </a>
          }
          title={albumData?.name as string}>
          <div className=''>
            <EuiImage
              size='l'
              hasShadow
              alt={`${albumData?.name} (portrait)`}
              src={albumData?.images[0].url ?? ""}
            />
          </div>
          <div className=''>
            <h3 className=' font-bold'>Artists:</h3>
            <ul>
              {albumData?.artists.map((artist: Artist) => (
                <li key={artist.id}>
                  <span className='mr-2'>{`${artist.name}: `}</span>
                  <a
                    href={artist.external_urls.spotify}
                    target='_blank'
                    rel='noreferrer'>
                    Look in Spotify
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Release Date:</strong>{" "}
            {formatDate(albumData?.release_date as string)}
          </p>
          <p>
            <strong>Type:</strong> {albumData?.album_type}
          </p>
        </EuiCard>
      </div>
      <div className='flex justify-center items-center'>
        <EuiAccordion
          id={noArrowAccordionId}
          arrowDisplay='none'
          buttonContent={
            <h3 className=' text-xl'>
              <strong>Tracks:</strong> {`${albumData?.total_tracks}`}
            </h3>
          }>
          {albumData?.tracks.map((track) => (
            <EuiPanel key={track?.id} color='subdued'>
              {/* TODO: Do the track another accordion that display the track info */}
              <p>
                <strong>{track?.track_number}: </strong>
                {track?.name}
              </p>
            </EuiPanel>
          ))}
        </EuiAccordion>
      </div>
    </div>
  );
}
