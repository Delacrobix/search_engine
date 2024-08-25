export interface JsonIds {
  [key: string]: string[] | undefined;
  track?: string[];
  album?: string[];
  playlist?: string[];
  artist?: string[];
  show?: string[];
  episode?: string[];
  audiobook?: string[];
}

export interface QueriesPerType {
  [key: string]: Queries | undefined;
  track?: Queries;
  album?: Queries;
  playlist?: Queries;
  artist?: Queries;
  show?: Queries;
  episode?: Queries;
  audiobook?: Queries;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface TokenData {
  token: string;
  expirationDate: number;
  type: string;
}

interface Queries {
  queries: string[];
}

export interface RequestQueue {
  type: string;
  id: string;
}
