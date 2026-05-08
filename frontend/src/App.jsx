import { BrowserRouter, Routes, Route } from "react-router-dom";

import Clientes from "./pages/Clientes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Clientes />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;