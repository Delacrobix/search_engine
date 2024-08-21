import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200",
  index: "spotify-albums",
});

const es_config = {
  searchQuery: {
    search_fields: {
      "artists.name": {},
      name: {},
      // TODO: Search as you type is not working
      "name.search_as_you_type": {},
      "copyrights.text": {},
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
      name: { raw: {} },
      type: { raw: {} },
      images: { raw: {} },
    },
    facets: {
      // TODO: This is not working: for some reason, the facet is not being displayed
      "copyrights.type.keyword": {
        type: "value",
      },
      "label.keyword": {
        type: "value",
      },
      album_type: {
        type: "value",
      },
      available_markets: {
        type: "value",
        size: 100,
      },
    },
  },
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};

export default es_config;
