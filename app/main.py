from fastapi import FastAPI
import os

app = FastAPI()


@app.get("/")
async def root():
    db_user = os.environ['DB_USER']
    return {"message": f'Hello {db_user}'}