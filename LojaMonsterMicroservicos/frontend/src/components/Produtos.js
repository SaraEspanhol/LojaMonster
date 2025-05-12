import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Produtos.css';
import NovoProduto from './NovoProduto';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const carregarProdutos = () => {
    axios.get('http://localhost:3001/produtos')
      .then(res => {
        setProdutos(res.data);
        // Salva os produtos em cache
        localStorage.setItem('produtosCache', JSON.stringify(res.data));
      })
      .catch(err => {
        console.warn('Servidor de produtos offline. Carregando do cache...');
        const cache = localStorage.getItem('produtosCache');
        if (cache) {
          setProdutos(JSON.parse(cache));
        }
      });
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleProdutoCadastrado = () => {
    carregarProdutos();
    setMostrarFormulario(false);
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

const getImagemProduto = (nome) => {
  return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGxvdDR4dmtpNjRnNW96azFsdjExbmFycWkweGpqOWhweWthZmc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yqGJSngXaaa9W/giphy.gif';
};

export default Produtos;
