import React from "react";
import { Results as ElasticResults } from "@elastic/react-search-ui";
import { EuiCard } from "@elastic/eui";

export default function Results() {
  return (
    <ElasticResults
      className='grid grid-cols-2 gap-3'
      resultView={ResultsView}
    />
  );
}

interface ResultsViewProps {
  result: any;
  onClickLink: () => void;
}

function ResultsView({ result, onClickLink }: Readonly<ResultsViewProps>) {
  console.log(result);

  function handlerClick() {
    console.log("Clicked");
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
          src={result.images.raw[1].url}
          alt={`${result.name.raw}-album-cover`}
        />
      }
      title={<h3 className=' text-cyan-900 py-1'>{result.name.raw}</h3>}
      description={
        <span className='block '>
          <span className='block text-gray-700 mb-2'>
            {"Artists: " +
              result.artists.raw.map((artist: any) => artist.name).join(", ")}
          </span>
          <span className='block text-gray-700 mb-2'>
            {"Release date: " + result.release_date.raw}
          </span>
          <span className='block text-gray-700'>{result.album_type.raw}</span>
        </span>
      }
    />
  );
}
