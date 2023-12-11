from fastapi import FastAPI
from routers import users_router, auth_router


app = FastAPI()


app.include_router(users_router)
app.include_router(auth_router)
