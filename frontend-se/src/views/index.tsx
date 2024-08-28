import {
  Paging,
  PagingInfo,
  ResultsPerPage,
  SearchProvider,
} from "@elastic/react-search-ui";

import Facets from "../components/facets";
import Results from "../components/results";
import SearchBox from "../components/searchBox";
import es_config from "../config/es_config";
import Options from "../components/options";
import { useOptionsContext } from "../context/optionsContext";

export default function Index() {
  const {
    searchAsYouType,
    highlighting,
    toggleHighlighting,
    toggleSearchAsYouType,
  } = useOptionsContext();

  return (
    <SearchProvider config={es_config}>
      <div className='w-full h-full p-4'>
        <div className='w-full '>
          <SearchBox />
        </div>
        <div className='p-4'>
          <Options
            optionsList={[
              {
                name: "Highlight",
                checked: highlighting,
                onClick: toggleHighlighting,
              },
              {
                name: "Search as you type",
                checked: searchAsYouType,
                onClick: toggleSearchAsYouType,
              },
            ]}
          />
        </div>
        <div className='flex'>
          <div className='pl-4 pr-8 mt-4'>
            {/* TODO: add `have preview` facet */}
            {/* <Facets field='copyrights.type.keyword' label='Copyrights type' /> */}
            <Facets field='have_preview_url' label='Have preview' />
            <Facets field='label.keyword' label='Produce by' />
            <Facets field='album_type' label='Album type' />
            <Facets field='total_tracks' label='Tracks' />
          </div>
          <div className='w-full'>
            <Results />
          </div>
        </div>
        <div>
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
