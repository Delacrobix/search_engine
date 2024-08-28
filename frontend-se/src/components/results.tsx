import { Results as ElasticResults } from "@elastic/react-search-ui";
import { EuiCard } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import { Artist } from "../types/types";
import { useOptionsContext } from "../context/optionsContext";

export default function Results() {
  return (
    <ElasticResults
      className='grid grid-cols-2 gap-3'
      titleField='name'
      resultView={ResultsView}
    />
  );
}

function ResultsView({ result }: Readonly<ResultsViewProps>) {
  const { highlighting } = useOptionsContext();

  console.log(result);
  const navigate = useNavigate();

  function handlerClick() {
    const albumId = result.id.raw;

    navigate(`/album/${albumId}`);
  }

  function highlightSnippet(snippet: string, color: string = "yellow"): string {
    return snippet
      .replace(/<em>/g, `<span style="background-color: ${color};">`)
      .replace(/<\/em>/g, "</span>");
  }

  return (
    <EuiCard
      className='h-full'
      layout='horizontal'
      hasBorder={true}
      onClick={handlerClick}
      icon={
        <img
          className=' max-w-32 max-h-32'
          src={result.images.raw[2].url}
          alt={`${result.name.raw}-album-cover`}
        />
      }
      title={
        highlighting ? (
          <h3
            className='text-cyan-900 py-1'
            dangerouslySetInnerHTML={{
              __html: result.name?.snippet
                ? highlightSnippet(result.name.snippet[0])
                : result.name.raw,
            }}
          />
        ) : (
          <h3 className='text-cyan-900 py-1'>{result.name.raw}</h3>
        )
      }
      description={
        <span className='flex gap-4'>
          <span>
            <span className='block text-gray-700 mb-2'>
              {"Artists: " +
                result.artists.raw
                  .map((artist: Artist) => artist.name)
                  .join(", ")}
            </span>
            <span className='block text-gray-700 mb-2'>
              {"Release date: " + result.release_date.raw}
            </span>
            <span className='block text-gray-700 mb-2'>
              {"Tracks: " + result.total_tracks.raw}
            </span>
            <span className='block text-gray-700'>{result.album_type.raw}</span>
          </span>
        </span>
      }
    />
  );
}

interface ResultsViewProps {
  result: any;
}
