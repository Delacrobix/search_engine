import React from "react";
import {
  SearchProvider,
  Results,
  PagingInfo,
  Facet,
  ResultsPerPage,
  Paging,
} from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";

import SearchBox from "../componentes/searchBox";
import es_config from "../config/es_config";

export default function Index() {
  return (
    <SearchProvider config={es_config}>
      <div className='w-full h-full'>
        <div className='w-full p-4'>
          <SearchBox />
        </div>
        <PagingInfo />
        <Results />
        <ResultsPerPage />
        <Facet
          field='available_markets.keyword'
          label='Available Markets'
          view={MultiCheckboxFacet}
        />
        <Paging />
      </div>
    </SearchProvider>
  );
}
