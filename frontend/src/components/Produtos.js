import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Produtos.css';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/produtos')
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  return (
    <div className="produtos-container">
      <h1 className="titulo">Nossos Produtos</h1>
      <div className="produtos-grid">
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-card">
            <img
              src={getImagemProduto(produto.nome)}
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
  if (nome.includes('Original')) return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGxvdDR4dmtpNjRnNW96azFsdjExbmFycWkweGpqOWhweWthZmc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yqGJSngXaaa9W/giphy.gif';
  if (nome.includes('White')) return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGxvdDR4dmtpNjRnNW96azFsdjExbmFycWkweGpqOWhweWthZmc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yqGJSngXaaa9W/giphy.gif';
  if (nome.includes('Mango')) return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGxvdDR4dmtpNjRnNW96azFsdjExbmFycWkweGpqOWhweWthZmc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yqGJSngXaaa9W/giphy.gif';
  if (nome.includes('Pipeline')) return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGxvdDR4dmtpNjRnNW96azFsdjExbmFycWkweGpqOWhweWthZmc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yqGJSngXaaa9W/giphy.gif';
  if (nome.includes('Zero')) return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGxvdDR4dmtpNjRnNW96azFsdjExbmFycWkweGpqOWhweWthZmc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yqGJSngXaaa9W/giphy.gif';
  return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGxvdDR4dmtpNjRnNW96azFsdjExbmFycWkweGpqOWhweWthZmc4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yqGJSngXaaa9W/giphy.gif';
};

export default Produtos;
