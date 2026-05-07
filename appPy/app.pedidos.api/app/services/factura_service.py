from sqlalchemy.orm import Session

from app.models.factura import Factura

from app.schemas.factura_schema import (
    FacturaCreate,
    FacturaUpdate
)


# Obtener todas las facturas
def get_facturas(db: Session):

    return db.query(Factura).all()


# Obtener factura por ID
def get_factura(db: Session, factura_id: int):

    return db.query(Factura).filter(
        Factura.id == factura_id
    ).first()


# Crear factura
def create_factura(
    db: Session,
    factura: FacturaCreate
):

    nueva_factura = Factura(

        pedido_id=factura.pedido_id,

        numero_factura=factura.numero_factura,

        total=factura.total
    )

    db.add(nueva_factura)

    db.commit()

    db.refresh(nueva_factura)

    return nueva_factura


# Actualizar factura
def update_factura(
    db: Session,
    factura_id: int,
    factura_data: FacturaUpdate
):

    factura = db.query(Factura).filter(
        Factura.id == factura_id
    ).first()

    if factura:

        factura.pedido_id = factura_data.pedido_id

        factura.numero_factura = factura_data.numero_factura

        factura.total = factura_data.total

        db.commit()

        db.refresh(factura)

    return factura


# Eliminar factura
def delete_factura(
    db: Session,
    factura_id: int
):

    factura = db.query(Factura).filter(
        Factura.id == factura_id
    ).first()

    if factura:

        db.delete(factura)

        db.commit()

    return factura