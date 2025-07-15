from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Serve the `out` directory
app.mount("/", StaticFiles(directory="out", html=True), name="static")

@app.get("/update")
async def update():
    return {"message": "Update endpoint called"}