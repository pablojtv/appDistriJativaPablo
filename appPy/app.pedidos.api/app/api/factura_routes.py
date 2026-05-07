from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.schemas.factura_schema import (
    FacturaCreate,
    FacturaUpdate,
    FacturaResponse
)

from app.services.factura_service import (
    get_facturas,
    get_factura,
    create_factura,
    update_factura,
    delete_factura
)


router = APIRouter(
    prefix="/facturas",
    tags=["Facturas"]
)


# Conexion DB
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# Obtener todas las facturas
@router.get(
    "/",
    response_model=list[FacturaResponse]
)
def listar_facturas(
    db: Session = Depends(get_db)
):

    return get_facturas(db)


# Obtener factura por ID
@router.get(
    "/{factura_id}",
    response_model=FacturaResponse
)
def obtener_factura(
    factura_id: int,
    db: Session = Depends(get_db)
):

    factura = get_factura(db, factura_id)

    if not factura:

        raise HTTPException(
            status_code=404,
            detail="Factura no encontrada"
        )

    return factura


# Crear factura
@router.post(
    "/",
    response_model=FacturaResponse
)
def crear_factura(
    factura: FacturaCreate,
    db: Session = Depends(get_db)
):

    return create_factura(db, factura)


# Actualizar factura
@router.put(
    "/{factura_id}",
    response_model=FacturaResponse
)
def actualizar_factura(
    factura_id: int,
    factura: FacturaUpdate,
    db: Session = Depends(get_db)
):

    factura_actualizada = update_factura(
        db,
        factura_id,
        factura
    )

    if not factura_actualizada:

        raise HTTPException(
            status_code=404,
            detail="Factura no encontrada"
        )

    return factura_actualizada


# Eliminar factura
@router.delete("/{factura_id}")
def eliminar_factura(
    factura_id: int,
    db: Session = Depends(get_db)
):

    factura = delete_factura(
        db,
        factura_id
    )

    if not factura:

        raise HTTPException(
            status_code=404,
            detail="Factura no encontrada"
        )

    return {
        "message": "Factura eliminada correctamente"
    }