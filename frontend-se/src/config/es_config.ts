import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

import { Facets } from "./elements/facets";

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200",
  index: "spotify-albums",
});

const es_config = {
  searchQuery: {
    search_fields: {
      "artists.name": {},
      name: {},
      "tracks.artists.name": {},
    },
    result_fields: {
      release_date: { raw: {} },
      total_tracks: { raw: {} },
      tracks: { raw: {} },
      popularity: { raw: {} },
      external_urls: { raw: {} },
      label: { raw: {} },
      genres: { raw: {} },
      copyrights: { raw: {} },
      available_markets: { raw: {} },
      album_type: { raw: {} },
      artists: { raw: {} },
      name: {
        snippet: {
          fallback: true,
        },
      },
      type: { raw: {} },
      images: { raw: {} },
    },
    facets: Facets,
  },
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};

export default es_config;
