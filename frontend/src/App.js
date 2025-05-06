import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Produtos from './components/Produtos';
import Pedidos from './components/Pedidos';
import NovoPedido from './components/NovoPedido';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/produtos" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/novo-pedido" element={<NovoPedido />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;