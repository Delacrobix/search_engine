import React from "react";
import {
  SearchProvider,
  PagingInfo,
  ResultsPerPage,
  Paging,
} from "@elastic/react-search-ui";

import SearchBox from "../componentes/searchBox";
import es_config from "../config/es_config";
import Facets from "../componentes/facets";
import Results from "../componentes/results";

export default function Index() {
  return (
    <SearchProvider config={es_config}>
      <div className='w-full h-full'>
        <div className='w-full p-4'>
          <SearchBox />
        </div>
        <div className='flex'>
          <div className='pl-4 pr-8 mt-4'>
            <Facets field='album_type.keyword' label='Album type' />
            <Facets field='copyrights.type.keyword' label='Copyrights type' />
            <Facets field='genres.keyword' label='Genres' />
          </div>
          <div className='w-full'>
            <Results />
          </div>
        </div>
        <div className=''>
          <ResultsPerPage />
        </div>
        <div className='flex'>
          <Paging />
        </div>
        <div className=' p-4'>
          <PagingInfo />
        </div>
      </div>
    </SearchProvider>
  );
}
