import React, { useState } from 'react';
import axios from 'axios';

const NovoProduto = ({ onProdutoCadastrado }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !preco || !imagem) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    const novoProduto = {
      nome,
      preco: parseFloat(preco),
      imagem
    };

    axios.post('http://localhost:3001/produtos', novoProduto)
      .then((res) => {
        if (typeof onProdutoCadastrado === 'function') {
          onProdutoCadastrado(); // Só chama se for função
        }
        alert('Produto cadastrado com sucesso!');
        setNome('');
        setPreco('');
        setImagem('');
      })
      .catch((err) => {
        console.error('Erro ao cadastrar produto:', err);
        alert('Erro ao cadastrar produto');
      });
  };

  return (
    <div className="novo-produto-form">
      <h3>Cadastrar Novo Produto</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imagem">URL da Imagem:</label>
          <input
            type="text"
            id="imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default NovoProduto;
