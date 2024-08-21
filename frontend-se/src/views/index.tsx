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

export default function Index() {
  return (
    <SearchProvider config={es_config}>
      <div className='w-full h-full'>
        <div className='w-full p-4'>
          <SearchBox />
        </div>
        <div className=''>
          <Options
            optionsList={[
              {
                name: "highlight",
                onClick: () => {
                  console.log("clicked");
                },
              },
            ]}
          />
        </div>
        <div className='flex'>
          <div className='pl-4 pr-8 mt-4'>
            {/* <Facets field='copyrights.type.keyword' label='Copyrights type' /> */}
            <Facets field='label.keyword' label='Produce by' />
            <Facets field='album_type' label='Album type' />
            <Facets field='available_markets' label='Available markets' />
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
