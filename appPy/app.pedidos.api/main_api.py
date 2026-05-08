from http.client import HTTPResponse

from fastapi.responses import HTMLResponse, JSONResponse
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.api.factura_routes import router as factura_router

from app.core.database import engine, Base

from app.schemas.schemas import Usuario

from app.services.jwt_manager import create_token


app = FastAPI()

app.title = "Api service ECPedidos"

app.version = "0.0.1"


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Code First
Base.metadata.create_all(bind=engine)


# Rutas
app.include_router(router)

app.include_router(factura_router)


# Login
@app.post('/login', tags=['seguridad'])
def login(user: Usuario):

    if user.email == "admin@gmail.com" and user.password == "admin":

        token: str = create_token(user.model_dump())

        return JSONResponse(
            status_code=200,
            content=token
        )


@app.get("/")
def root():

    return {
        "message": "API EcPedidos funcionando"
    }


@app.get('/', tags=['test'])
def message():

    return HTTPResponse(
        '<h1>Aplicaciones Distribuidas -- Apis en Python</h1>'
    )