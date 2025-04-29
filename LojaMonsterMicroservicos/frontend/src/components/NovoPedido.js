import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NovoPedido() {
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/produtos');
      setProdutos(res.data);
    } catch (err) {
      alert('Erro ao carregar produtos');
    }
  };

  const adicionarItem = () => {
    const produto = produtos.find(p => p.id === Number(produtoId));
    if (!produto) {
      alert('Produto inválido');
      return;
    }
    setItens([...itens, { nomeProduto: produto.nome, quantidade }]);
    setProdutoId('');
    setQuantidade(1);
  };

  const fecharPedido = async () => {
    if (itens.length === 0) {
      alert('Adicione ao menos um produto ao pedido');
      return;
    }
    try {
        await axios.post('http://localhost:3002/pedidos', { itens });
      setItens([]);
      alert('Pedido criado com sucesso!');
    } catch (err) {
      alert('Erro ao criar pedido');
    }
  };

  return (
    <div>
      <h2>Novo Pedido</h2>
      <select value={produtoId} onChange={e => setProdutoId(e.target.value)}>
        <option value="">Selecione um produto</option>
        {produtos.map(p => (
          <option key={p.id} value={p.id}>{p.nome}</option>
        ))}
      </select>
      <input type="number" min="1" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} />
      <button onClick={adicionarItem}>Adicionar Produto</button>

      <h3>Itens do Pedido</h3>
      <ul>
        {itens.map((item, index) => (
          <li key={index}>{item.nomeProduto} - Quantidade: {item.quantidade}</li>
        ))}
      </ul>
      <button onClick={fecharPedido}>Fechar Pedido</button>
    </div>
  );
}

export default NovoPedido;
