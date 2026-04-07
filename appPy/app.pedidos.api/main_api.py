from fastapi.responses import HTMLResponse
from fastapi import FastAPI
from app.api.routes import router
from app.core.database import engine, Base

app = FastAPI()
app.title = "Api service ECPedidos"
app.version = "0.0.1"

# Code First
Base.metadata.create_all(bind=engine)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "API EcPedidos funcionando"}


@app.get('/', tags=['test'])
def message():
    return HTTPResponse('<h1>Aplicaciones Distribuidas -- Apis en Python</h1>')