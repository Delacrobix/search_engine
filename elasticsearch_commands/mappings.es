PUT spotify-album
{
  "mappings": {
    "properties": {
      "album_type": {
        "keyword": {
          "type": "keyword"
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
      "copyrights": {
        "type": "nested",
        "properties": {
          "text": {
            "type": "text"
          },
          "type": {
            "type": "keyword"
          }
        }
      },
      "external_ids": {
        "type": "nested",
        "properties": {
          "upc": {
            "type": "keyword"
          }
        }
      },
      "external_urls": {
        "type": "nested",
        "properties": {
          "spotify": {
            "type": "text"
          }
        }
      },
      "genres": {
        "type": "keyword"
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
      "label": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
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
      "release_date": {
        "type": "date"
      },
      "release_date_precision": {
        "type": "keyword"
      },
      "total_tracks": {
        "type": "short"
      },
      "tracks": {
        "type": "nested",
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
              "id": {
                "type": "keyword"
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
            "type": "text"
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

PUT spotify-artist
{
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


