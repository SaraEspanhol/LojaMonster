const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

// Caminho para persistir os pedidos
const pedidosFilePath = path.join(__dirname, 'pedidos.json');

// Função para ler os pedidos de um arquivo
const lerPedidos = () => {
  try {
    const pedidosData = fs.readFileSync(pedidosFilePath);
    return JSON.parse(pedidosData);
  } catch (err) {
    return [];
  }
};

// Função para salvar os pedidos no arquivo
const salvarPedidos = (pedidos) => {
  fs.writeFileSync(pedidosFilePath, JSON.stringify(pedidos, null, 2));
};

let proximoId = 1;

app.post('/pedidos', async (req, res) => {
  const { cliente, produtos } = req.body;

  if (!produtos || produtos.length === 0) {
    return res.status(400).json({ erro: 'Produtos inválidos' });
  }

  const pedido = {
    id: proximoId++,
    cliente: cliente || 'Consumidor',
    produtos,
    data: new Date().toISOString(),
  };

  const pedidos = lerPedidos(); // Carrega os pedidos persistidos
  pedidos.push(pedido); // Adiciona o novo pedido
  salvarPedidos(pedidos); // Salva os pedidos no arquivo

  // Envia evento para o Event Bus
  try {
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'PedidoCriado',
        dados: pedido,
      })
    });
  } catch (err) {
    console.error('Erro ao enviar evento:', err.message);
  }

  res.status(201).json(pedido);
});

// Escuta eventos (para outras atualizações)
app.post('/events', (req, res) => {
  const evento = req.body;
  console.log('📦 Pedido-Service recebeu evento:', evento.type);
  res.send({});
});

app.get('/pedidos', (req, res) => {
  const pedidos = lerPedidos(); // Carrega os pedidos persistidos
  res.json(pedidos);
});

app.listen(3002, () => {
  console.log('🛒 Pedido-Service rodando na porta 3002');
});
