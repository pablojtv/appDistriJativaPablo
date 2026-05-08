import { useState } from "react";
import axios from "axios";

export default function TuTiendaEC() {
  const [datos, setDatos] = useState([]);
  const [titulo, setTitulo] = useState("Resultados API");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("clientes");
  const [token, setToken] = useState(null);

  // =========================================
  // LOGIN FASTAPI (se ejecuta al iniciar)
  // =========================================
  const loginFastAPI = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email: "admin@gmail.com",
        password: "admin"
      });
      setToken(response.data);
      console.log("✅ Login FastAPI exitoso");
      return response.data;
    } catch (error) {
      console.error("❌ Error login FastAPI:", error);
      alert("❌ Error login FastAPI - ¿El servidor FastAPI está corriendo en puerto 8000?");
      return null;
    }
  };

  // =========================================
  // CLIENTES CRUD (API .NET 7037)
  // =========================================
  const obtenerClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7037/api/Cliente/obtener-todos");
      const informacion = response.data.$values || response.data;
      setTitulo("👥 Clientes Registrados");
      setDatos(informacion);
      setActiveTab("clientes");
    } catch (error) {
      console.error(error);
      alert("❌ Error obteniendo clientes");
    } finally {
      setLoading(false);
    }
  };

  const crearCliente = async () => {
    const nombre = prompt("📝 Ingrese el nombre del cliente:");
    if (!nombre) return;
    
    const email = prompt("📧 Ingrese el email del cliente:");
    if (!email) return;
    
    const nuevoCliente = {
      id: 0,
      estado: true,
      nombre: nombre,
      apellido: prompt("📝 Apellido:") || "",
      email: email,
      cedulaIdentidad: prompt("🆔 Cédula:") || "",
      fechaNacimiento: new Date().toISOString(),
      telefono: prompt("📞 Teléfono:") || ""
    };
    
    setLoading(true);
    try {
      await axios.post("https://localhost:7037/api/Cliente", nuevoCliente);
      alert("✅ Cliente creado correctamente");
      obtenerClientes();
    } catch (error) {
      console.error(error);
      alert("❌ Error creando cliente");
    } finally {
      setLoading(false);
    }
  };

  const actualizarCliente = async () => {
    const id = prompt("📝 Ingrese el ID del cliente a actualizar:");
    if (!id) return;
    
    const nombre = prompt("📝 Nuevo nombre:");
    if (!nombre) return;
    
    const clienteActualizado = {
      id: parseInt(id),
      estado: true,
      nombre: nombre,
      apellido: prompt("📝 Nuevo apellido:") || "",
      email: prompt("📧 Nuevo email:") || "",
      cedulaIdentidad: prompt("🆔 Nueva cédula:") || "",
      fechaNacimiento: new Date().toISOString(),
      telefono: prompt("📞 Nuevo teléfono:") || ""
    };
    
    setLoading(true);
    try {
      await axios.put(`https://localhost:7037/api/Cliente/${id}`, clienteActualizado);
      alert("✅ Cliente actualizado correctamente");
      obtenerClientes();
    } catch (error) {
      console.error(error);
      alert("❌ Error actualizando cliente");
    } finally {
      setLoading(false);
    }
  };

  const eliminarCliente = async () => {
    const id = prompt("📝 Ingrese el ID del Cliente a eliminar:");
    if (!id) return;
    
    if (!confirm(`¿Eliminar cliente ID: ${id}?`)) return;
    
    setLoading(true);
    try {
      await axios.delete(`https://localhost:7037/api/Cliente/${id}`);
      alert("✅ Cliente eliminado");
      obtenerClientes();
    } catch (error) {
      console.error(error);
      alert("❌ Error eliminando cliente");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // DIRECCIONES CRUD (API .NET 7037)
  // =========================================
  const obtenerDirecciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7037/api/DireccionCliente/obtener-todos");
      const informacion = response.data.$values || response.data;
      setTitulo("📍 Direcciones Registradas");
      setDatos(informacion);
      setActiveTab("direcciones");
    } catch (error) {
      console.error(error);
      alert("❌ Error obteniendo direcciones");
    } finally {
      setLoading(false);
    }
  };

  const crearDireccion = async () => {
    const clienteId = prompt("📝 ID del cliente:");
    if (!clienteId) return;
    
    const nuevaDireccion = {
      id: 0,
      clienteId: parseInt(clienteId),
      provincia: prompt("🏛️ Provincia:") || "",
      ciudad: prompt("🏙️ Ciudad:") || "",
      direccion: prompt("📍 Dirección:") || "",
      codigoPostal: prompt("📮 Código Postal:") || "",
      estado: true
    };
    
    setLoading(true);
    try {
      await axios.post("https://localhost:7037/api/DireccionCliente", nuevaDireccion);
      alert("✅ Dirección creada");
      obtenerDirecciones();
    } catch (error) {
      console.error(error);
      alert("❌ Error creando dirección");
    } finally {
      setLoading(false);
    }
  };

  const actualizarDireccion = async () => {
    const id = prompt("📝 ID de la dirección a actualizar:");
    if (!id) return;
    
    const direccionActualizada = {
      id: parseInt(id),
      clienteId: parseInt(prompt("📝 ID del cliente:") || 0),
      provincia: prompt("🏛️ Provincia:") || "",
      ciudad: prompt("🏙️ Ciudad:") || "",
      direccion: prompt("📍 Dirección:") || "",
      codigoPostal: prompt("📮 Código Postal:") || "",
      estado: true
    };
    
    setLoading(true);
    try {
      await axios.put(`https://localhost:7037/api/DireccionCliente/${id}`, direccionActualizada);
      alert("✅ Dirección actualizada");
      obtenerDirecciones();
    } catch (error) {
      console.error(error);
      alert("❌ Error actualizando dirección");
    } finally {
      setLoading(false);
    }
  };

  const eliminarDireccion = async () => {
    const id = prompt("📝 ID de la dirección a eliminar:");
    if (!id) return;
    
    if (!confirm(`¿Eliminar dirección ID: ${id}?`)) return;
    
    setLoading(true);
    try {
      await axios.delete(`https://localhost:7037/api/DireccionCliente/${id}`);
      alert("✅ Dirección eliminada");
      obtenerDirecciones();
    } catch (error) {
      console.error(error);
      alert("❌ Error eliminando dirección");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // PERSONAS CRUD (API .NET 7037)
  // =========================================
  const obtenerPersonas = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7037/api/Persona");
      const informacion = response.data.$values || response.data;
      setTitulo("👤 Personas Registradas");
      setDatos(informacion);
      setActiveTab("personas");
    } catch (error) {
      console.error(error);
      alert("❌ Error obteniendo personas");
    } finally {
      setLoading(false);
    }
  };

  const obtenerPersonaPorId = async () => {
    const id = prompt("📝 ID de la persona:");
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7037/api/Persona/${id}`);
      setTitulo(`👤 Persona ID: ${id}`);
      setDatos([response.data]);
      setActiveTab("personas");
    } catch (error) {
      console.error(error);
      alert("❌ Error obteniendo persona");
    } finally {
      setLoading(false);
    }
  };

  const crearPersona = async () => {
    const nombre = prompt("📝 Nombre:");
    if (!nombre) return;
    
    const nuevaPersona = {
      id: 0,
      nombre: nombre,
      edad: parseInt(prompt("🎂 Edad:") || 0),
      fecha: new Date().toISOString(),
      activo: true
    };
    
    setLoading(true);
    try {
      await axios.post("https://localhost:7037/api/Persona", nuevaPersona);
      alert("✅ Persona creada");
      obtenerPersonas();
    } catch (error) {
      console.error(error);
      alert("❌ Error creando persona");
    } finally {
      setLoading(false);
    }
  };

  const actualizarPersona = async () => {
    const id = prompt("📝 ID de la persona a actualizar:");
    if (!id) return;
    
    const personaActualizada = {
      id: parseInt(id),
      nombre: prompt("📝 Nuevo nombre:") || "",
      edad: parseInt(prompt("🎂 Nueva edad:") || 0),
      fecha: new Date().toISOString(),
      activo: true
    };
    
    setLoading(true);
    try {
      await axios.put(`https://localhost:7037/api/Persona/${id}`, personaActualizada);
      alert("✅ Persona actualizada");
      obtenerPersonas();
    } catch (error) {
      console.error(error);
      alert("❌ Error actualizando persona");
    } finally {
      setLoading(false);
    }
  };

  const eliminarPersona = async () => {
    const id = prompt("📝 ID de la persona a eliminar:");
    if (!id) return;
    
    if (!confirm(`¿Eliminar persona ID: ${id}?`)) return;
    
    setLoading(true);
    try {
      await axios.delete(`https://localhost:7037/api/Persona/${id}`);
      alert("✅ Persona eliminada");
      obtenerPersonas();
    } catch (error) {
      console.error(error);
      alert("❌ Error eliminando persona");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // PEDIDOS CRUD (FastAPI 8000)
  // =========================================
  const obtenerPedidos = async () => {
    setLoading(true);
    try {
      let currentToken = token;
      if (!currentToken) {
        currentToken = await loginFastAPI();
      }
      if (!currentToken) return;

      const response = await axios.get("http://127.0.0.1:8000/pedidos", {
        headers: { Authorization: `Bearer ${currentToken}` }
      });

      setTitulo("🛒 Pedidos Registrados");
      setDatos(response.data);
      setActiveTab("pedidos");
    } catch (error) {
      console.error(error);
      alert("❌ Error obteniendo pedidos");
    } finally {
      setLoading(false);
    }
  };

  const crearPedido = async () => {
    const direccionId = prompt("📍 ID de dirección del cliente:");
    if (!direccionId) return;
    
    const total = parseFloat(prompt("💰 Total del pedido:") || 0);
    if (total <= 0) {
      alert("⚠️ El total debe ser mayor a 0");
      return;
    }
    
    const nuevoPedido = {
      direccion_cliente_id: parseInt(direccionId),
      fecha_pedido: new Date().toISOString(),
      total: total
    };
    
    setLoading(true);
    try {
      let currentToken = token;
      if (!currentToken) {
        currentToken = await loginFastAPI();
      }
      if (!currentToken) return;

      await axios.post("http://127.0.0.1:8000/pedidos", nuevoPedido, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      alert("✅ Pedido creado correctamente");
      obtenerPedidos();
    } catch (error) {
      console.error(error);
      alert("❌ Error creando pedido");
    } finally {
      setLoading(false);
    }
  };

  const actualizarPedido = async () => {
    const id = prompt("📝 ID del pedido a actualizar:");
    if (!id) return;
    
    const total = parseFloat(prompt("💰 Nuevo total:") || 0);
    if (total <= 0) {
      alert("⚠️ El total debe ser mayor a 0");
      return;
    }
    
    const pedidoActualizado = {
      direccion_cliente_id: parseInt(prompt("📍 Nueva dirección ID:") || 0),
      fecha_pedido: new Date().toISOString(),
      total: total
    };
    
    setLoading(true);
    try {
      let currentToken = token;
      if (!currentToken) {
        currentToken = await loginFastAPI();
      }
      if (!currentToken) return;

      await axios.put(`http://127.0.0.1:8000/pedidos/${id}`, pedidoActualizado, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      alert("✅ Pedido actualizado correctamente");
      obtenerPedidos();
    } catch (error) {
      console.error(error);
      alert("❌ Error actualizando pedido");
    } finally {
      setLoading(false);
    }
  };

  const eliminarPedido = async () => {
    const id = prompt("📝 ID del pedido a eliminar:");
    if (!id) return;
    
    if (!confirm(`¿Eliminar pedido ID: ${id}?`)) return;
    
    setLoading(true);
    try {
      let currentToken = token;
      if (!currentToken) {
        currentToken = await loginFastAPI();
      }
      if (!currentToken) return;

      await axios.delete(`http://127.0.0.1:8000/pedidos/${id}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      alert("✅ Pedido eliminado");
      obtenerPedidos();
    } catch (error) {
      console.error(error);
      alert("❌ Error eliminando pedido");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // FACTURAS CRUD (FastAPI 8000)
  // =========================================
  const obtenerFacturas = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/facturas");
      setTitulo("🧾 Facturas Registradas");
      setDatos(response.data);
      setActiveTab("facturas");
    } catch (error) {
      console.error(error);
      alert("❌ Error obteniendo facturas");
    } finally {
      setLoading(false);
    }
  };

  const crearFactura = async () => {
    const pedidoId = prompt("📝 ID del pedido:");
    if (!pedidoId) return;
    
    const numeroFactura = prompt("🔢 Número de factura:") || `FAC-${Date.now()}`;
    const total = parseFloat(prompt("💰 Total de la factura:") || 0);
    
    const nuevaFactura = {
      pedido_id: parseInt(pedidoId),
      numero_factura: numeroFactura,
      total: total
    };
    
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/facturas", nuevaFactura);
      alert("✅ Factura creada correctamente");
      obtenerFacturas();
    } catch (error) {
      console.error(error);
      alert("❌ Error creando factura");
    } finally {
      setLoading(false);
    }
  };

  const actualizarFactura = async () => {
    const id = prompt("📝 ID de la factura a actualizar:");
    if (!id) return;
    
    const facturaActualizada = {
      pedido_id: parseInt(prompt("📝 Nuevo ID de pedido:") || 0),
      numero_factura: prompt("🔢 Nuevo número de factura:") || "",
      total: parseFloat(prompt("💰 Nuevo total:") || 0)
    };
    
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/facturas/${id}`, facturaActualizada);
      alert("✅ Factura actualizada correctamente");
      obtenerFacturas();
    } catch (error) {
      console.error(error);
      alert("❌ Error actualizando factura");
    } finally {
      setLoading(false);
    }
  };

  const eliminarFactura = async () => {
    const id = prompt("📝 ID de la factura a eliminar:");
    if (!id) return;
    
    if (!confirm(`¿Eliminar factura ID: ${id}?`)) return;
    
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/facturas/${id}`);
      alert("✅ Factura eliminada");
      obtenerFacturas();
    } catch (error) {
      console.error(error);
      alert("❌ Error eliminando factura");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // RENDERIZADO DE DATOS
  // =========================================
  const renderData = () => {
    if (!datos || datos.length === 0) {
      return (
        <div className="text-center text-muted py-5">
          <i className="bi bi-inbox fs-1"></i>
          <p className="mt-3">No hay datos disponibles</p>
          <small>Presiona un botón para cargar información</small>
        </div>
      );
    }

    // Tabla para Clientes
    if (activeTab === "clientes" && datos[0] && datos[0].nombre !== undefined) {
      return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th><th>Nombre</th><th>Apellido</th><th>Email</th>
                <th>Cédula</th><th>Teléfono</th><th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.id}</td><td>{item.nombre}</td><td>{item.apellido || "-"}</td>
                  <td>{item.email}</td><td>{item.cedulaIdentidad || "-"}</td>
                  <td>{item.telefono || "-"}</td><td>{item.estado ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Tabla para Direcciones
    if (activeTab === "direcciones" && datos[0] && datos[0].direccion !== undefined) {
      return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th><th>Cliente ID</th><th>Provincia</th><th>Ciudad</th>
                <th>Dirección</th><th>Código Postal</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.id}</td><td>{item.clienteId}</td><td>{item.provincia || "-"}</td>
                  <td>{item.ciudad || "-"}</td><td>{item.direccion}</td>
                  <td>{item.codigoPostal || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Tabla para Personas
    if (activeTab === "personas" && datos[0] && datos[0].nombre !== undefined) {
      return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr><th>ID</th><th>Nombre</th><th>Edad</th><th>Fecha</th><th>Activo</th></tr>
            </thead>
            <tbody>
              {datos.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.id}</td><td>{item.nombre}</td><td>{item.edad}</td>
                  <td>{new Date(item.fecha).toLocaleDateString()}</td>
                  <td>{item.activo ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Tabla para Pedidos
    if (activeTab === "pedidos" && datos[0] && datos[0].direccion_cliente_id !== undefined) {
      return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th><th>Dirección Cliente</th><th>Fecha Pedido</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.id}</td>
                  <td>{item.direccion_cliente_id}</td>
                  <td>{new Date(item.fecha_pedido).toLocaleDateString()}</td>
                  <td className="text-success fw-bold">${item.total?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Tabla para Facturas
    if (activeTab === "facturas" && datos[0] && datos[0].numero_factura !== undefined) {
      return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th><th>Pedido ID</th><th>N° Factura</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.id}</td>
                  <td>{item.pedido_id}</td>
                  <td><code>{item.numero_factura}</code></td>
                  <td className="text-success fw-bold">${item.total?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // JSON para otros casos
    return (
      <pre className="bg-dark text-light p-3 rounded" style={{ whiteSpace: "pre-wrap", maxHeight: "500px", overflow: "auto" }}>
        {JSON.stringify(datos, null, 2)}
      </pre>
    );
  };

  // Funciones genéricas para CRUD según módulo
  const crearGenerico = () => {
    if (activeTab === "clientes") crearCliente();
    if (activeTab === "direcciones") crearDireccion();
    if (activeTab === "personas") crearPersona();
    if (activeTab === "pedidos") crearPedido();
    if (activeTab === "facturas") crearFactura();
  };

  const actualizarGenerico = () => {
    if (activeTab === "clientes") actualizarCliente();
    if (activeTab === "direcciones") actualizarDireccion();
    if (activeTab === "personas") actualizarPersona();
    if (activeTab === "pedidos") actualizarPedido();
    if (activeTab === "facturas") actualizarFactura();
  };

  const eliminarGenerico = () => {
    if (activeTab === "clientes") eliminarCliente();
    if (activeTab === "direcciones") eliminarDireccion();
    if (activeTab === "personas") eliminarPersona();
    if (activeTab === "pedidos") eliminarPedido();
    if (activeTab === "facturas") eliminarFactura();
  };

  // Módulos disponibles
  const modulos = [
    { id: "clientes", nombre: "👥 Clientes", color: "primary", accion: obtenerClientes },
    { id: "direcciones", nombre: "📍 Direcciones", color: "info", accion: obtenerDirecciones },
    { id: "personas", nombre: "👤 Personas", color: "secondary", accion: obtenerPersonas },
    { id: "pedidos", nombre: "🛒 Pedidos", color: "warning", accion: obtenerPedidos },
    { id: "facturas", nombre: "🧾 Facturas", color: "success", accion: obtenerFacturas }
  ];

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3">🛒 TuTiendaEC - Ecommerce Ecuador</h1>
          <p className="text-secondary">CRUD completo | Clientes | Direcciones | Personas | Pedidos | Facturas</p>
          <hr className="w-50 mx-auto" />
        </div>

        {/* Botones de módulos */}
        <div className="row g-3 mb-4">
          {modulos.map(mod => (
            <div className="col-md-2" key={mod.id}>
              <button
                className={`btn btn-${mod.color} w-100 py-3 fw-bold shadow-sm ${activeTab === mod.id ? 'active border-3' : ''}`}
                onClick={mod.accion}
                disabled={loading}
              >
                {mod.nombre}
              </button>
            </div>
          ))}
        </div>

        {/* Botones de acciones CRUD - Para TODOS los módulos */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <button className="btn btn-success w-100 py-2" onClick={crearGenerico} disabled={loading}>
              <i className="bi bi-plus-circle me-2"></i>Crear {activeTab.slice(0, -1)}
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-warning w-100 py-2" onClick={actualizarGenerico} disabled={loading}>
              <i className="bi bi-pencil me-2"></i>Actualizar {activeTab.slice(0, -1)}
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-danger w-100 py-2" onClick={eliminarGenerico} disabled={loading}>
              <i className="bi bi-trash me-2"></i>Eliminar {activeTab.slice(0, -1)}
            </button>
          </div>
        </div>

        {/* Botón especial para Persona por ID */}
        {activeTab === "personas" && (
          <div className="row mb-4">
            <div className="col-md-12">
              <button className="btn btn-outline-primary w-100 py-2" onClick={obtenerPersonaPorId} disabled={loading}>
                <i className="bi bi-search me-2"></i>Buscar Persona por ID
              </button>
            </div>
          </div>
        )}

        {/* Resultados */}
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header bg-primary text-white rounded-top-4">
            <div className="d-flex align-items-center">
              <i className="bi bi-database fs-4 me-2"></i>
              <h4 className="mb-0">{titulo}</h4>
              {loading && <div className="spinner-border spinner-border-sm ms-3"></div>}
            </div>
          </div>
          <div className="card-body p-4">
            {renderData()}
          </div>
          <div className="card-footer bg-light text-muted rounded-bottom-4">
            <small>
              <i className="bi bi-info-circle me-1"></i>
              {activeTab === "clientes" && "API: /api/Cliente (Puerto 7037) - Total: " + datos.length}
              {activeTab === "direcciones" && "API: /api/DireccionCliente (Puerto 7037) - Total: " + datos.length}
              {activeTab === "personas" && "API: /api/Persona (Puerto 7037) - Total: " + datos.length}
              {activeTab === "pedidos" && "API: FastAPI (Puerto 8000) - Total: " + datos.length}
              {activeTab === "facturas" && "API: FastAPI (Puerto 8000) - Total: " + datos.length}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}