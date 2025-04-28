import React, { useState } from 'react';

function PedidoForm({ produtos, onCriarPedido }) {
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const produtoSelecionado = produtos.find(p => p.id == produtoId);
    if (!produtoSelecionado || quantidade <= 0) {
      alert('Selecione um produto válido e uma quantidade maior que zero.');
      return;
    }
    onCriarPedido({ nomeProduto: produtoSelecionado.nome, quantidade });
    setProdutoId('');
    setQuantidade(1);
  };

  return (
    <div>
      <h2>Fazer Pedido</h2>
      <form onSubmit={handleSubmit}>
        <select value={produtoId} onChange={e => setProdutoId(e.target.value)}>
          <option value=''>Selecione um produto</option>
          {produtos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <input
          type='number'
          value={quantidade}
          onChange={e => setQuantidade(Number(e.target.value))}
          min='1'
        />
        <button type='submit'>Criar Pedido</button>
      </form>
    </div>
  );
}

export default PedidoForm;
