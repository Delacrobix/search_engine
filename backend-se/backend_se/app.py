from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def read_root():

    return {"ok": True}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
