const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Armazena todos os eventos recebidos
const eventos = [];

// Rota que recebe eventos dos serviços
app.post('/eventos', (req, res) => {
  const evento = req.body;

  console.log('📨 Event Bus recebeu:', evento.tipo);

  eventos.push(evento); // Salva evento para reprocessamento futuro

  // Encaminha evento para os outros serviços (ajuste as portas conforme necessário)
  fetch('http://localhost:3001/eventos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento)
  }).catch(err => console.error('Erro ao encaminhar para produtos:', err.message));

  fetch('http://localhost:3002/eventos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento)
  }).catch(err => console.error('Erro ao encaminhar para pedidos:', err.message));

  res.send({ status: 'OK' });
});

app.get('/eventos', (req, res) => {
  res.json(eventos);
});

app.listen(3000, () => {
  console.log('🚌 Event Bus rodando na porta 3000');
});
