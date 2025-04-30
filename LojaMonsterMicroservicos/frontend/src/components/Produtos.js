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
    <div className="container text-center">
      <h2 className="mb-4">Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <input className="form-control mb-2" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do produto" />
          </div>
          <div className="col-md-2">
            <input className="form-control mb-2" type="number" value={preco} onChange={e => setPreco(e.target.value)} placeholder="Preço" />
          </div>
          <div className="col-md-2">
            <button className="btn btn-monster w-100" type="submit">Cadastrar</button>
          </div>
        </div>
      </form>
      <h3 className="mb-3">Lista de Produtos</h3>
      <div className="row">
        {produtos.map(prod => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card p-3 text-light">
              <h5>{prod.nome}</h5>
              <p>R$ {prod.preco.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produtos;
