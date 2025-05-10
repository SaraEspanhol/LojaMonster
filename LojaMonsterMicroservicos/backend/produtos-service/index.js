const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const produtos = [];

app.get('/produtos', (req, res) => {
  res.send(produtos);
});

app.post('/produtos', async (req, res) => {
  const { nome, preco, imagem } = req.body;
  const id = randomBytes(4).toString('hex');

  const novoProduto = { id, nome, preco, imagem };
  produtos.push(novoProduto);

  // Enviar evento para o Event Bus
  try {
    await axios.post('http://localhost:4005/events', {
      type: 'ProdutoCriado',
      data: novoProduto
    });
    console.log('[ProdutoService] Evento ProdutoCriado enviado');
  } catch (err) {
    console.error('[ProdutoService] Erro ao enviar evento:', err.message);
  }

  res.status(201).send(novoProduto);
});

app.post('/events', (req, res) => {
  const event = req.body;
  console.log('[ProdutoService] Evento recebido:', event.type);
  res.send({ status: 'ok' });
});

app.listen(3001, () => {
  console.log('Produto Service rodando na porta 3001');
});
