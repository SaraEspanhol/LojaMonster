const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let pedidos = [];
let proximoId = 1;

// Rota para criar novo pedido
app.post('/pedidos', (req, res) => {
  const { cliente, produtos } = req.body;

  if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
    return res.status(400).json({ erro: 'Lista de produtos inválida' });
  }

  const pedido = {
    id: proximoId++,
    cliente: cliente || 'Consumidor',
    produtos,
    data: new Date().toISOString(), // ISO 8601 para ser compatível com `new Date(...)`
  };

  pedidos.push(pedido);
  res.status(201).json(pedido);
});

// Rota para listar todos os pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🛒 Pedido-Service rodando na porta ${PORT}`);
});
