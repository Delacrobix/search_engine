import os

from elasticsearch import AsyncElasticsearch

ES_HOST = os.getenv("ES_HOST", "http://localhost:9200")


class ElasticsearchClient:
    def __init__(self):
        self.es = AsyncElasticsearch(ES_HOST)

    async def ping(self):
        return await self.es.ping()
