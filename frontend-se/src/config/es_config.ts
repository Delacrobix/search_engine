import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200",
  index: "spotify-album",
});

const es_config = {
  searchQuery: {
    search_fields: {
      artists: {},
      name: {},
      album_type: {},
      type: {},
    },
    result_fields: {
      album_type: { raw: {} },
      artists: { raw: {} },
      name: { raw: {} },
      type: { raw: {} },
    },
    facets: {
      "album_type.keyword": {
        type: "value",
        size: 25,
      },
    },
  },
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};

// const config = {
//   searchQuery: {
//     search_fields: {
//       name: {},
//       album: {},
//     },
//     result_fields: {
//       name: {
//         snippet: {},
//       },
//       type: {
//         snippet: {},
//       },
//     },
//     disjunctiveFacets: ["available_markets"],
//     facets: {
//       available_markets: {
//         type: "value",
//       },
//     },
//     facets: {
//       "genre.keyword": { type: "value" },
//       "actors.keyword": { type: "value" },
//       "directors.keyword": { type: "value" },
//       released: {
//         type: "range",
//         ranges: [
//           {
//             from: "2012-04-07T14:40:04.821Z",
//             name: "Within the last 10 years",
//           },
//           {
//             from: "1962-04-07T14:40:04.821Z",
//             to: "2012-04-07T14:40:04.821Z",
//             name: "10 - 50 years ago",
//           },
//           {
//             to: "1962-04-07T14:40:04.821Z",
//             name: "More than 50 years ago",
//           },
//         ],
//       },
//       imdbRating: {
//         type: "range",
//         ranges: [
//           { from: 1, to: 3, name: "Pants" },
//           { from: 3, to: 6, name: "Mediocre" },
//           { from: 6, to: 8, name: "Pretty Good" },
//           { from: 8, to: 10, name: "Excellent" },
//         ],
//       },
//     },
//   },
//   autocompleteQuery: {
//     results: {
//       resultsPerPage: 5,
//       search_fields: {
//         "title.suggest": {
//           weight: 3
//         }
//       },
//       result_fields: {
//         title: {
//           snippet: {
//             size: 100,
//             fallback: true
//           }
//         },
//         url: {
//           raw: {}
//         }
//       }
//     },
//     suggestions: {
//       types: {
//         results: { fields: ["movie_completion"] }
//       },
//       size: 4
//     }
//   },
//   apiConnector: connector,
//   alwaysSearchOnInitialLoad: true,
// };

export default es_config;
