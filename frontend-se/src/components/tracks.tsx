import { useEffect, useState } from "react";
import { EuiBasicTable } from "@elastic/eui";

import { Album as AlbumType, Track as TrackType } from "../types/types";
import { millisecondsToMinutes } from "../utils/functions";

const ELASTIC_ENDPOINT =
  import.meta.env.VITE_ELASTIC_ENDPOINT || "http://localhost:9200";

export default function Tracks({ data }: Readonly<TracksProps>) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  function toggleRow(id: string) {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  }

  const itemIdToExpandedRowMap = expandedRowId
    ? {
        [expandedRowId]: <Track id={expandedRowId} />,
      }
    : {};

  return (
    <EuiBasicTable
      tableCaption='Tracks'
      items={data?.tracks}
      itemId={"id"}
      itemIdToExpandedRowMap={itemIdToExpandedRowMap}
      columns={[
        {
          field: "track_number",
          name: "#",
          width: "10%",
        },
        {
          field: "name",
          name: "Name",
          width: "60%",
        },
        {
          field: "duration_ms",
          name: "Duration",
          width: "10%",
          render: (duration: number) => millisecondsToMinutes(duration),
        },
        {
          field: "explicit",
          name: "Explicit",
          width: "10%",
          render: (explicit: boolean) => (explicit ? "Yes" : "No"),
        },
      ]}
      rowProps={(item) => ({
        onClick: () => toggleRow(item.id),
        style: { cursor: "pointer" },
      })}
    />
  );
}

// TODO: fetch track data from elastic search
// FIXME: Theres a bug that causes the last item not render completely or sometimes not render at all

function Track({ id }: Readonly<TrackProps>) {
  const [trackData, setTrackData] = useState<TrackType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlbumData() {
      try {
        const response = await fetch(
          `${ELASTIC_ENDPOINT}/spotify-tracks/_search`,
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

        // console.log("Track data: ", data.hits.hits[0]._source);

        setTrackData(data.hits.hits[0]._source);
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
    trackData && (
      <div className='pl-4'>
        <p>
          <strong>Duration: </strong>
          {millisecondsToMinutes(trackData?.duration_ms)}
        </p>
        <p>
          <strong>Explicit: </strong> {trackData?.explicit ? "Yes" : "No"}
        </p>
        <p>
          <strong>Preview: </strong>
          {trackData?.preview_url ? (
            <audio controls>
              <source src={trackData?.preview_url} type='audio/mpeg' />
              <track kind='captions' label='Captions' />
            </audio>
          ) : (
            "No preview available"
          )}
        </p>
      </div>
    )
  );
}

interface TracksProps {
  data: AlbumType;
}

interface TrackProps {
  id: string;
}
