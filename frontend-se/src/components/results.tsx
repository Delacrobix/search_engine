import { Results as ElasticResults } from "@elastic/react-search-ui";
import { EuiCard } from "@elastic/eui";
import { useNavigate } from "react-router-dom";

export default function Results() {
  return (
    <ElasticResults
      className='grid grid-cols-2 gap-3'
      titleField='name'
      resultView={ResultsView}
    />
  );
}

interface ResultsViewProps {
  result: any;
}

function ResultsView({ result }: Readonly<ResultsViewProps>) {
  console.log(result);
  const navigate = useNavigate();

  function handlerClick() {
    const albumId = result.id.raw;

    navigate(`/album/${albumId}`);
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
      title={<h3 className=' text-cyan-900 py-1'>{result.name.raw}</h3>}
      description={
        <span className='flex gap-4'>
          <span>
            <span className='block text-gray-700 mb-2'>
              {"Artists: " +
                result.artists.raw.map((artist: any) => artist.name).join(", ")}
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
