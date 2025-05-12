// Importa o framework Express
const express = require('express');
// Middleware para interpretar JSON no corpo das requisições
const bodyParser = require('body-parser');

// Cria uma instância da aplicação Express
const app = express();
app.use(bodyParser.json());

// Função que envia o evento recebido para outros serviços
const sendEvent = async (port, event) => {
  try {
    const response = await fetch(`http://localhost:${port}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar para a porta ${port}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✔️ Resposta da porta ${port}:`, data);
  } catch (error) {
    console.log(`❌ Falha ao enviar para porta ${port}:`, error.message);
  }
};

// Endpoint que recebe eventos e propaga para outros serviços
app.post('/events', (req, res) => {
  const event = req.body;
  console.log('📨 Evento recebido:', event);

  // Redireciona o evento para os serviços
  sendEvent(3001, event); // Produto-Service
  sendEvent(3002, event); // Pedido-Service
  // Adicione mais se necessário

  res.send({});
});

// Inicia o Event Bus
app.listen(4005, () => {
  console.log('🚏 Event Bus rodando na porta 4005');
});
