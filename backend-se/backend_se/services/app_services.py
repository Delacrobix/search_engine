from backend_se.types.elasticsearch_client import ElasticsearchClient

es_client = ElasticsearchClient()


async def is_es_ok():
    try:
        return await es_client.es.ping()
    except Exception as e:
        print(e)


async def es_search(query: dict, index: str):

    try:
        return await es_client.es.search(index=index, body={"query": query})
    except Exception as e:
        print("Error in services, search: ", e)
        raise e
