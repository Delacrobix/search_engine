import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EuiAccordion,
  EuiCard,
  EuiImage,
  EuiPanel,
  useGeneratedHtmlId,
} from "@elastic/eui";

import { Album as AlbumType, Artist, Track as TrackType } from "../types/types";
import {
  formatDate,
  getUuidString,
  millisecondsToMinutes,
} from "../utils/functions";

const ELASTIC_ENDPOINT =
  import.meta.env.VITE_ELASTIC_ENDPOINT || "http://localhost:9200";

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const noArrowAccordionId = useGeneratedHtmlId({ prefix: "noArrowAccordion" });
  const multipleAccordion = useGeneratedHtmlId({ prefix: "multipleAccordion" });

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
    <div className=' min-h-screen flex items-center justify-center'>
      <div className='w-full md:w-[60%] lg:w-[50%]'>
        <EuiCard
          className='m-2'
          title={albumData?.name as string}
          description={
            <a target='_blank' href={albumData?.external_urls?.spotify}>
              Look album in Spotify
            </a>
          }>
          <div>
            <EuiImage
              size='l'
              alt={`${albumData?.name} (portrait)`}
              src={albumData?.images[0].url ?? ""}
            />
          </div>
          <div>
            <h3 className=' font-bold'>Artists:</h3>
            <ul>
              {albumData?.artists.map((artist: Artist) => (
                <li key={artist.id}>
                  <span className='mr-2'>{`${artist.name}: `}</span>
                  <a
                    href={artist.external_urls.spotify}
                    // TODO: fetch track data from elastic search  target='_blank'
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
      <div className='h-full'>
        <EuiAccordion
          paddingSize='l'
          color='subdued'
          id={noArrowAccordionId}
          arrowDisplay='none'
          buttonContent={
            <h3 className=' text-xl'>
              <strong>Tracks:</strong> {`${albumData?.total_tracks}`}
            </h3>
          }>
          {albumData?.tracks.map((track) => (
            <div key={getUuidString()}>
              <EuiAccordion
                id={multipleAccordion}
                arrowDisplay='none'
                buttonContent={
                  <EuiPanel>
                    <p>
                      <strong>{track?.track_number}: </strong>
                      {track?.name}
                    </p>
                  </EuiPanel>
                }>
                <Track track={track} />
              </EuiAccordion>
            </div>
          ))}
        </EuiAccordion>
      </div>
    </div>
  );
}

// TODO: fetch track data from elastic search

function Track({ track }: Readonly<TrackProps>) {
  return (
    <div>
      <p>
        <strong>Duration: </strong> {millisecondsToMinutes(track.duration_ms)}
      </p>
      <p>
        <strong>Explicit: </strong> {track.explicit ? "Yes" : "No"}
      </p>
      <p>
        <strong>Preview: </strong>
        {track.preview_url ? (
          <audio controls>
            <source src={track.preview_url} type='audio/mpeg' />
            <track kind='captions' label='Captions' />
          </audio>
        ) : (
          "No preview available"
        )}
      </p>
    </div>
  );
}

interface TrackProps {
  track: TrackType;
}
