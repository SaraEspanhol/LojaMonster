import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';



// Importa estilos do Bootstrap e Animate.css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Renderiza o App dentro do modo estrito do React (ajuda a identificar problemas)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
