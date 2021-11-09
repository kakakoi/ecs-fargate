from fastapi import FastAPI
import os

app = FastAPI()

secret_name = 'DB_SECRET'

@app.get("/")
async def root():
    db_user = os.environ['DB_USER']
    secret_text = os.environ[secret_name]
    return {"message": f'Hello {db_user} - {secret_text}'}