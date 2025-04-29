import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || preco <= 0) {
      alert('Nome e preço válidos são obrigatórios.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/produtos', { nome, preco: parseFloat(preco) });
      setNome('');
      setPreco('');
      carregarProdutos();
      alert('Produto cadastrado com sucesso!');
    } catch (err) {
      alert('Erro ao cadastrar produto');
    }
  };

  return (
    <div>
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit}>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
        <input type="number" value={preco} onChange={e => setPreco(e.target.value)} placeholder="Preço" />
        <button type="submit">Cadastrar</button>
      </form>
      <h3>Lista de Produtos</h3>
      <ul>
        {produtos.map(prod => (
          <li key={prod.id}>{prod.nome} - R$ {prod.preco.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
