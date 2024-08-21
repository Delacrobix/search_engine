export type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights: Copyrights[];
  external_ids: External_ids;
  external_urls: External_urls;
  genres: string[];
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: Track[];
  type: string;
};

export type Artist = {
  external_urls: External_urls;
  id: string;
  name: string;
  type: string;
};

type Track = {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: External_urls;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

type Copyrights = {
  text: string;
  type: string;
};

type External_urls = {
  spotify: string;
};

type External_ids = {
  upc: string;
};
