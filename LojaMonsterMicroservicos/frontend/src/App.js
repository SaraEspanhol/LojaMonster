import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produtos from './components/Produtos';
import NovoPedido from './components/NovoPedido';
import Pedidos from './components/Pedidos';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <nav>
          <Link to="/produtos">Produtos</Link> | <Link to="/novo-pedido">Novo Pedido</Link> | <Link to="/pedidos">Pedidos</Link>
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
