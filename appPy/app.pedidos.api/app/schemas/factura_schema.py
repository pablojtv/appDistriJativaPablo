from pydantic import BaseModel
from datetime import datetime


class FacturaBase(BaseModel):

    pedido_id: int
    numero_factura: str
    total: float


class FacturaCreate(FacturaBase):
    pass


class FacturaUpdate(FacturaBase):
    pass


class FacturaResponse(FacturaBase):

    id: int
    fecha_factura: datetime

    class Config:
        from_attributes = True