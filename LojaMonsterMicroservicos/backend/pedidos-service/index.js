const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

let pedidos = [];

app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

app.post('/pedidos', (req, res) => {
  const { nomeProduto, quantidade } = req.body;
  if (!nomeProduto || quantidade <= 0) {
    return res.status(400).json({ mensagem: 'Dados inválidos' });
  }
  const novoPedido = {
    id: uuidv4(),
    nomeProduto,
    quantidade,
    data: new Date().toISOString()
  };
  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
});

app.listen(PORT, () => {
  console.log(`Pedidos service rodando na porta ${PORT}`);
});
