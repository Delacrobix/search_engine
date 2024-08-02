from elasticsearch import Elasticsearch


class ElasticSearchClient:
    def __init__(self):
        self.es = Elasticsearch([{"host": "elasticsearch", "port": 9200}])
