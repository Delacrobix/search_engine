from fastapi import APIRouter, HTTPException

from config.elasticsearch import ElasticsearchClient

es_client = ElasticsearchClient()
router = APIRouter()


@router.get("/elastic-health", tags=["elasticsearch"])
async def health():
    health = await es_client.client.cluster.health()

    return health
