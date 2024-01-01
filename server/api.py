from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import users_router
from db import startup, shutdown
from typing import cast
import os


app = FastAPI()
CORS_URL = cast(str, os.getenv("MONGO_URI"))
origins = [
    CORS_URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users_router)


@app.on_event("startup")
async def on_startup():
    await startup()


@app.on_event("shutdown")
async def on_shutdown():
    await shutdown()
