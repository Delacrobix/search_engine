import json

from backend_se.services.app_services import es_search, is_es_ok
from backend_se.types.types import SearchQuery
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException

load_dotenv()

app = FastAPI(
    title="Search Engine API",
    description="This api will be used to search for documents in the Elasticsearch cluster.",
    version="1.0.0",
    contact={
        "name": "Jeffrey Rerín",
        "email": "jeffrey.rengifom@gmail.com",
    },
)


@app.get(
    "/health",
    summary="Check API Health",
    description="Returns the health status of the API.",
)
def read_root():

    return {"ok?": True}


@app.get(
    "/es-health",
    summary="Check Elasticsearch Health",
    description="Returns the health status of Elasticsearch.",
)
async def read_es_health():

    is_oks = await is_es_ok()
    return {"ok?": is_oks}


@app.post(
    "/search",
    summary="Search for documents in Elasticsearch",
    description="Search for documents in Elasticsearch by providing a query and an optional index.",
)
async def search(search_query: SearchQuery):
    try:
        parsed_query = search_query.query
    except json.JSONDecodeError as e:
        print("Error parsing query: ", e)
        raise HTTPException(status_code=400, detail="Invalid query format.")

    try:
        results = await es_search(parsed_query, search_query.index)
        return results
    except Exception as e:
        print("Error searching in ES: ", e)
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred.",
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
