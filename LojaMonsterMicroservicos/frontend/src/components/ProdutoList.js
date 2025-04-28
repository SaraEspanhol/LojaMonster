import React from 'react';

function ProdutoList({ produtos }) {
  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {produtos.map(prod => (
          <li key={prod.id}>{prod.nome} - R$ {prod.preco.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProdutoList;
