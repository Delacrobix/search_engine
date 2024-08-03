from elasticsearch import AsyncElasticsearch


class ElasticsearchClient:
    def __init__(self):
        self.es = AsyncElasticsearch("http://localhost:9200")

    async def ping(self):
        return await self.es.ping()
