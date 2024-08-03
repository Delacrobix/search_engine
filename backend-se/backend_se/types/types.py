from pydantic import BaseModel


class SearchQuery(BaseModel):
    query: dict
    index: str = "spotify-album"
