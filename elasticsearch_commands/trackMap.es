PUT _component_template/spotify-track_template
{
  "template": {
    "mappings": {
      "properties": {
        "album": {
          "type": "nested",
          "properties": {
            "album_type": {
              "type": "keyword"
            },
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
                "id": {
                  "type": "keyword"
                },
                "name": {
                  "type": "text",
                  "fields": {
                    "keyword": {
                      "type": "keyword"
                    }
                  }
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
            },
            "available_markets": {
              "type": "keyword"
            },
            "external_urls": {
              "type": "nested",
              "properties": {
                "spotify": {
                  "type": "text"
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
            "release_date": {
              "type": "date"
            },
            "release_date_precision": {
              "type": "keyword"
            },
            "total_tracks": {
              "type": "short"
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
        },
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
            "id": {
              "type": "keyword"
            },
            "name": {
              "type": "text",
              "fields": {
                "keyword": {
                  "type": "keyword"
                }
              }
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
        },
        "available_markets": {
          "type": "keyword"
        },
        "disc_number": {
          "type": "short"
        },
        "duration_ms": {
          "type": "integer"
        },
        "explicit": {
          "type": "boolean"
        },
        "external_urls": {
          "type": "nested",
          "properties": {
            "spotify": {
              "type": "text"
            }
          }
        },
        "external_ids": {
          "type": "nested",
          "properties": {
            "isrc": {
              "type": "keyword"
            }
          }
        },
        "id": {
          "type": "keyword"
        },
        "is_local": {
          "type": "boolean"
        },
        "name": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword"
            }
          }
        },
        "preview_url": {
          "type": "keyword"
        },
        "track_number": {
          "type": "short"
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


PUT _index_template/spotify-tracks_index-template
{
  "index_patterns": [
    "spotify-track*"
  ],
  "composed_of": [
    "spotify-track_template"
  ],
  "_meta": {
    "description": "This template is used for index the track data."
  }
}