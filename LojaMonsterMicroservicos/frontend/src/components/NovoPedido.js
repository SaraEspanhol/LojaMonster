import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NovoPedido({ ativarAnimacao }) {
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const res = await axios.get('http://localhost:3001/produtos');
    setProdutos(res.data);
  };

  const adicionarItem = () => {
    const produto = produtos.find(p => p.id === Number(produtoId));
    if (!produto || quantidade <= 0) {
      alert('Produto ou quantidade inválida');
      return;
    }
    setItens([...itens, { nomeProduto: produto.nome, quantidade }]);
    setProdutoId('');
    setQuantidade(1);
  };

  const fecharPedido = async () => {
    if (itens.length === 0) {
      alert('Adicione ao menos um produto');
      return;
    }
    try {
      await axios.post('http://localhost:3002/pedidos', { itens });
      setItens([]);
      if (ativarAnimacao) ativarAnimacao(); // ativa animação visual
    } catch (err) {
      alert('Erro ao criar pedido');
    }
  };

  return (
    <div className="container text-center">
      <h2 className="mb-4">Monte seu Pedido</h2>
      <div className="row justify-content-center mb-3">
        <div className="col-md-4">
          <select className="form-select" value={produtoId} onChange={e => setProdutoId(e.target.value)}>
            <option value="">Escolha o Produto</option>
            {produtos.map(p => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input type="number" min="1" className="form-control" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-monster w-100" onClick={adicionarItem}>Adicionar</button>
        </div>
      </div>
      <ul className="list-group mb-3">
        {itens.map((item, index) => (
          <li key={index} className="list-group-item bg-dark text-light">
            {item.nomeProduto} - {item.quantidade}
          </li>
        ))}
      </ul>
      <button className="btn btn-monster" onClick={fecharPedido}>Fechar Pedido</button>
    </div>
  );
}

export default NovoPedido;
