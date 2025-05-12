const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require('path');
const fetch = require('node-fetch'); // Certifique-se de ter instalado

app.use(cors());
app.use(express.json());

const pedidosFilePath = path.join(__dirname, 'pedidos.json');

// Lê os pedidos salvos no arquivo
const lerPedidos = () => {
  try {
    const data = fs.readFileSync(pedidosFilePath);
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Salva os pedidos no arquivo
const salvarPedidos = (pedidos) => {
  fs.writeFileSync(pedidosFilePath, JSON.stringify(pedidos, null, 2));
};

let proximoId = 1;

// Cria um novo pedido
app.post('/pedidos', async (req, res) => {
  const { cliente, produtos } = req.body;

  if (!Array.isArray(produtos) || produtos.length === 0) {
    return res.status(400).json({ erro: 'Produtos inválidos' });
  }

  const pedido = {
    id: proximoId++,
    cliente: cliente || 'Consumidor',
    produtos,
    data: new Date().toISOString()
  };

  const pedidos = lerPedidos();
  pedidos.push(pedido);
  salvarPedidos(pedidos);

  // Envia evento ao Event Bus
  try {
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'PedidoCriado',
        dados: pedido
      })
    });
  } catch (err) {
    console.error('❌ Erro ao enviar evento:', err.message);
  }

  res.status(201).json(pedido);
});

// Escuta eventos do Event Bus
app.post('/events', (req, res) => {
  const evento = req.body;
  console.log('📦 Pedido-Service recebeu evento:', evento.type);
  res.send({});
});

// Retorna todos os pedidos
app.get('/pedidos', (req, res) => {
  const pedidos = lerPedidos();
  res.json(pedidos);
});

// Inicia o serviço
app.listen(3002, () => {
  console.log('🛒 Pedido-Service rodando na porta 3002');
});
