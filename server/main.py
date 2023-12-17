from fastapi import FastAPI

from routers import users_router
from db import startup, shutdown


app = FastAPI()


app.include_router(users_router)


@app.on_event("startup")
async def on_startup():
    await startup()


@app.on_event("shutdown")
async def on_shutdown():
    await shutdown()
