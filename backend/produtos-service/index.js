// Importa o framework Express
const express = require('express');
// Importa o módulo CORS
const cors = require('cors');

const app = express(); // Inicializa o aplicativo Express
const PORT = 3001;     // Define a porta para o serviço de produtos

app.use(cors()); // Ativa o CORS
app.use(express.json()); // Habilita o uso de JSON no corpo da requisição

// Lista de produtos disponíveis (inicialmente fixa)
let produtos = [
  { id: 1, nome: 'Monster Energy Original', preco: 10.0, imagem: '' },
  { id: 2, nome: 'Monster Ultra White', preco: 12.0, imagem: '' },
  { id: 3, nome: 'Monster Mango Loco', preco: 13.0, imagem: '' },
  { id: 4, nome: 'Monster Pipeline Punch', preco: 14.0, imagem: '' },
  { id: 5, nome: 'Monster Zero Ultra', preco: 11.0, imagem: '' }
];

// Rota GET para retornar todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos); // Retorna o array de produtos
});

// Rota POST para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const { nome, preco, imagem } = req.body;

  // Validação simples
  if (!nome || preco <= 0 || !imagem) {
    return res.status(400).json({ mensagem: 'Nome, preço e imagem são obrigatórios' });
  }

  // Cria o novo produto com ID incremental
  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco,
    imagem
  };

  produtos.push(novoProduto); // Salva na lista
  res.status(201).json(novoProduto); // Retorna criado
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Produtos service rodando na porta ${PORT}`);
});
