import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Produtos.css';
import NovoProduto from './NovoProduto';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const carregarProdutos = () => {
    axios.get('http://localhost:3001/produtos')
      .then(res => setProdutos(res.data))
      .catch(err => console.error('Erro ao carregar produtos:', err));
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleProdutoCadastrado = () => {
    carregarProdutos();
    setMostrarFormulario(false); // Fecha o formulário após cadastro
  };

  return (
    <div className="produtos-container text-light">
      <h1 className="titulo">Nossos Produtos</h1>
      <button
        className="btn btn-monster mb-3"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? 'Fechar Formulário' : 'Cadastrar Novo Produto'}
      </button>

      {mostrarFormulario && (
        <NovoProduto onProdutoCadastrado={handleProdutoCadastrado} />
      )}

      <div className="produtos-grid mt-4">
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-card bg-dark text-light">
            <img
              src={produto.imagem || getImagemProduto(produto.nome)}
              alt={produto.nome}
              className="produto-imagem"
            />
            <h2>{produto.nome}</h2>
            <p>R$ {produto.preco.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Imagem padrão animada
const getImagemProduto = (nome) => {
  return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGxvdDR4dmtpNjRnNW96azFsdjExbmFycWkweGpqOWhweWthZmc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yqGJSngXaaa9W/giphy.gif';
};

export default Produtos;
