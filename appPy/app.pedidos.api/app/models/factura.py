from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    DECIMAL,
    ForeignKey
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.core.database import Base


class Factura(Base):

    __tablename__ = "facturas"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    pedido_id = Column(
        Integer,
        ForeignKey("pedidos.id"),
        nullable=False
    )

    numero_factura = Column(
        String(100),
        nullable=False
    )

    fecha_factura = Column(
        DateTime,
        default=datetime.utcnow
    )

    total = Column(
        DECIMAL(10, 2),
        nullable=False
    )

    pedido = relationship("Pedido")