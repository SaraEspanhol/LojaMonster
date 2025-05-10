import React from 'react';
// Importa os componentes de roteamento do React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Importa os componentes usados nas rotas
import Produtos from './components/Produtos';
import NovoProduto from './components/NovoProduto';
import Pedidos from './components/Pedidos';
import NovoPedido from './components/NovoPedido';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function App() {
  return (
    // Define que toda a aplicação usará rotas do tipo BrowserRouter
    <Router>
      <Navbar /> {/* Exibe a barra de navegação no topo */}
      <Routes>
        {/* Redireciona da raiz para /produtos */}
        <Route path="/" element={<Navigate to="/produtos" replace />} />
        <Route path="/novo-produto" element={<NovoProduto />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/novo-pedido" element={<NovoPedido />} />
      </Routes>
      <Footer /> {/* Exibe o rodapé em todas as páginas */}
    </Router>
  );
}

export default App;
