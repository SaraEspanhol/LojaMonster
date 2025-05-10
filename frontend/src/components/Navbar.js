import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Estilo da navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Monster Loja</h1>
      <div className="gif-container">
        <img 
          src="https://i.gifer.com/N9Nk.gif" 
          alt="Monster Gif" 
          className="navbar-gif"
        />
      </div>
      <div className="nav-links">
        <Link to="/produtos">Produtos</Link>
        <Link to="/novo-produto">Novo Produto</Link>
        <Link to="/pedidos">Pedidos</Link>
        <Link to="/novo-pedido">Novo Pedido</Link>
      </div>
    </nav>
  );
};

export default Navbar;
