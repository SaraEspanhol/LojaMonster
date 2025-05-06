import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Loja Monster. Todos os direitos reservados.</p>
      <p>Feito com energia 💀 e cafeína ☕</p>
    </footer>
  );
};

export default Footer;
