import React from "react";
import { Results as ElasticResults } from "@elastic/react-search-ui";

export default function Results() {
  return (
    <div>
      <ElasticResults resultView={ResultsView} />
    </div>
  );
}

interface ResultsViewProps {
  result: any;
  onClickLink: () => void;
}

function ResultsView({ result, onClickLink }: Readonly<ResultsViewProps>) {
  console.log(result);

  return (
    <li className=' border-b-2'>
      <div className='py-2'>
        <h3>
          {result.name.raw}
          {/* Maintain onClickLink to correct track click throughs for analytics*/}
          {/* <a onClick={onClickLink} href={result.nps_link.raw}>
          {result.title.snippet}
        </a> */}
        </h3>
      </div>
      <div className=''>
        {result.album_type.raw}
        {/* {JSON.stringify(result.artists.raw)} */}
        {/* use 'raw' values of fields to access values without snippets */}
        <div className=''>
          {/* <img src={result.image_url.raw} alt="" /> */}
        </div>
        {/* Use the 'snippet' property of fields with dangerouslySetInnerHtml to render snippets */}
        {/* <div
          className='sui-result__details'
          dangerouslySetInnerHTML={{
            __html: result.description.snippet,
          }}></div> */}
      </div>
    </li>
  );
}
