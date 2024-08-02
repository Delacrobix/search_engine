from typing import List, Optional

from pydantic import BaseModel


class Artist(BaseModel):
    id: str


class Track(BaseModel):
    id: str


class Album(BaseModel):
    id: str
