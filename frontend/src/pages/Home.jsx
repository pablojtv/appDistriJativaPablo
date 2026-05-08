import { useEffect, useState } from "react";
import { productosAPI } from "../services/api";

export default function Home() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {

      const response = await productosAPI.get("/productos");

      setProductos(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">

      <h1 className="mb-4 text-center">
        Mi E-Commerce
      </h1>

      <div className="row">

        {productos.map((p) => (

          <div className="col-md-4 mb-4" key={p.id}>

            <div className="card shadow">

              <img
                src={p.imagen}
                className="card-img-top"
                alt={p.nombre}
              />

              <div className="card-body">

                <h5>{p.nombre}</h5>

                <p>${p.precio}</p>

                <button className="btn btn-primary w-100">
                  Agregar
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}