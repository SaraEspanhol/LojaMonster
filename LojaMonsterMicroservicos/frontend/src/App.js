import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produtos from './components/Produtos';
import NovoPedido from './components/NovoPedido';
import Pedidos from './components/Pedidos';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container py-3">
        <img className="gif-banner" src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif" alt="Monster Energy" />
        <nav className="mb-4">
          <Link className="btn btn-outline-light me-2" to="/produtos">Produtos</Link>
          <Link className="btn btn-outline-light me-2" to="/novo-pedido">Novo Pedido</Link>
          <Link className="btn btn-outline-light" to="/pedidos">Pedidos</Link>
        </nav>
        <Routes>
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/novo-pedido" element={<NovoPedido />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
