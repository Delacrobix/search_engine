import os

from dotenv import load_dotenv
from elasticsearch import AsyncElasticsearch

load_dotenv()

ELASTICSEARCH_HOST = os.getenv("ELASTICSEARCH_HOST")


class ElasticsearchClient:

    def __init__(self):
        self.client = AsyncElasticsearch(hosts=[ELASTICSEARCH_HOST])
