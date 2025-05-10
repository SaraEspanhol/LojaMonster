import React from 'react';

function Mensagem({ tipo, mensagem }) {
  if (!mensagem) return null;

  return (
    <div style={{
      padding: '10px',
      margin: '10px 0',
      border: tipo === 'erro' ? '1px solid red' : '1px solid green',
      color: tipo === 'erro' ? 'red' : 'green',
      backgroundColor: tipo === 'erro' ? '#ffe6e6' : '#e6ffe6'
    }}>
      {mensagem}
    </div>
  );
}

export default Mensagem;
