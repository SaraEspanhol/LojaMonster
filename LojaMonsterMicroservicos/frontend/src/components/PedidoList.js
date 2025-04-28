import React from 'react';

function PedidoList({ pedidos }) {
  return (
    <div>
      <h2>Pedidos</h2>
      <ul>
        {pedidos.map(p => (
          <li key={p.id}>{p.nomeProduto} - Quantidade: {p.quantidade}</li>
        ))}
      </ul>
    </div>
  );
}

export default PedidoList;
