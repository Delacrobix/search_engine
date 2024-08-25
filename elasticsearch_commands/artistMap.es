PUT _component_template/spotify-artist_template
{
  "template": {
    "mappings": {
      "properties": {
        "artists": {
          "type": "nested",
          "properties": {
            "external_urls": {
              "type": "nested",
              "properties": {
                "spotify": {
                  "type": "text"
                }
              }
            },
            "followers": {
              "type": "integer"
            },
            "genres": {
              "type": "text",
              "fields": {
                "keyword": {
                  "type": "keyword"
                }
              }
            },
            "id": {
              "type": "keyword"
            },
            "images": {
              "type": "nested",
              "properties": {
                "url": {
                  "type": "text"
                },
                "height": {
                  "type": "short"
                },
                "width": {
                  "type": "short"
                }
              }
            },
            "name": {
              "type": "text",
              "fields": {
                "keyword": {
                  "type": "keyword"
                },
                "search_as_you_type": {
                  "type": "search_as_you_type"
                }
              }
            },
            "popularity": {
              "type": "rank_feature"
            },
            "type": {
              "type": "text",
              "fields": {
                "keyword": {
                  "type": "keyword"
                }
              }
            }
          }
        }
      }
    }
  }
}


PUT _index_template/spotify-artists_index-template
{
  "index_patterns": [
    "spotify-artist*"
  ],
  "composed_of": [
    "spotify-artist_template"
  ],
  "_meta": {
    "description": "This template is used for index the artist data."
  }
}