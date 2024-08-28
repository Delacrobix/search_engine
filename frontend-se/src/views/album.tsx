import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EuiBadge, EuiImage } from "@elastic/eui";

import { Album as AlbumType, Artist, Track as TrackType } from "../types/types";
import { formatDate, millisecondsToMinutes } from "../utils/functions";
import Tracks from "../components/tracks";

const ELASTIC_ENDPOINT =
  import.meta.env.VITE_ELASTIC_ENDPOINT || "http://localhost:9200";

export default function Album() {
  const { id } = useParams<{ id: string }>();

  const [albumData, setAlbumData] = useState<AlbumType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: abstract this fetch into a custom hook with index and id like params
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

        // console.log("Album data: ", data.hits.hits[0]._source);

        setAlbumData(data.hits.hits[0]._source);
      } catch (error) {
        setError("Failed to fetch album data");
      } finally {
        setLoading(false);
      }
    }

    fetchAlbumData();
  }, [id]);

  function calculateTotalDuration(tracks: TrackType[]): string {
    const totalDuration = tracks.reduce(
      (acc: number, track: TrackType) => acc + track.duration_ms,
      0
    );

    return millisecondsToMinutes(totalDuration);
  }

  function onArtistClick(url: string) {
    window.open(url, "_blank");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex m-4'>
        <div>
          <EuiImage
            size='l'
            alt={`${albumData?.name} (portrait)`}
            src={albumData?.images[0].url ?? ""}
          />
        </div>
        <div className='md:mx-8 flex flex-col items-center justify-center '>
          <div className=''>
            <h3 className='text-4xl font-bold py-6 '>{albumData?.name}</h3>
          </div>
          <div className='w-full space-y-4 uppercase '>
            <a target='_blank' href={albumData?.external_urls?.spotify}>
              Look album in Spotify
            </a>
            <div className='flex gap-1'>
              <h3 className=' font-bold mr-2'>Artists:</h3>
              <div className='flex'>
                {albumData?.artists?.map((artist: Artist) => (
                  <EuiBadge
                    onClickAriaLabel='Click to view artist in Spotify'
                    //TODO: new page artist and redirect there when click
                    onClick={() =>
                      onArtistClick(artist?.external_urls?.spotify)
                    }
                    key={artist.id}
                    color='default'>
                    {artist.name}
                  </EuiBadge>
                ))}
              </div>
            </div>
            <p>
              <strong>Release Date:</strong>{" "}
              {formatDate(albumData?.release_date as string)}
            </p>
            <p>
              <strong>Type:</strong> {albumData?.album_type}
            </p>
            <p className=' font-semibold'>
              {albumData?.total_tracks} SONGS (
              {albumData?.tracks && calculateTotalDuration(albumData.tracks)})
            </p>
          </div>
        </div>
      </div>
      {/* TRACKS LIST */}
      <div className='md:mx-[20%]'>
        {albumData && <Tracks data={albumData} />}
      </div>
    </div>
  );
}
