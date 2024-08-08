import { size } from "@elastic/eui/src/themes/amsterdam/global_styling/variables/_size";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200",
  index: "spotify-album",
});

const es_config = {
  searchQuery: {
    search_fields: {
      "artists.name": {},
      name: {},
    },
    result_fields: {
      release_date: { raw: {} },
      total_tracks: { raw: {} },
      tracks: { raw: {} },
      popularity: { raw: {} },
      external_urls: { raw: {} },
      genres: { raw: {} },
      copyrights: { raw: {} },
      available_markets: { raw: {} },
      album_type: { raw: {} },
      artists: { raw: {} },
      name: { raw: {} },
      type: { raw: {} },
      images: { raw: {} },
    },
    facets: {
      "genres.keyword": {
        type: "value",
        size: 10,
      },
      "copyrights.type.keyword": {
        type: "value",
        size: 10,
      },
      "album_type.keyword": {
        type: "value",
        size: 10,
      },
    },
  },
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};

export default es_config;
