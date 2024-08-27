export const Facets = {
  total_tracks: {
    type: "range",
    ranges: [
      { from: 0, to: 10, name: "0-10 tracks" },
      { from: 11, to: 20, name: "11-20 tracks" },
      { from: 21, to: 30, name: "21-30 tracks" },
      { from: 31, to: 40, name: "31-40 tracks" },
      { from: 41, to: 50, name: "41-50 tracks" },
      { from: 51, name: "51+ tracks" },
    ],
  },
  have_preview_url: {
    type: "value",
    options: [
      { value: "true", name: "Have preview" },
      { value: "false", name: "No preview" },
    ],
  },
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
};
