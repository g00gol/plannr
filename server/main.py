from fastapi import FastAPI
from routers import users_router


app = FastAPI()


app.include_router(users_router)
