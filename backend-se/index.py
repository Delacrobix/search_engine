from fastapi import APIRouter

from controllers import elasticsearch

app = APIRouter()

app.include_router(elasticsearch.router, prefix="/es")


@app.get("/health", tags=["health"])
async def health():
    return {"status": "ok"}
