const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const sendEvent = async (port, event) => {
  try {
    const response = await fetch(`http://localhost:${port}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição para a porta ${port}: ${response.statusText}`)
    }
    const data = await response.json();
    console.log(`Resposta da porta ${port}: ${data}`);
  } catch (error) {
    console.log(`Problema ao enviar o evento para a porta ${port}: ${error}`);
  }
}

app.post('/events', (req, res) => {
  const event = req.body;
  console.log('Evento recebido', event);
  sendEvent(4000, event); // Envia evento para o serviço de pedidos
  sendEvent(4001, event); // Outros serviços que você tenha
  res.send({});
});

app.listen(4005, () => {
  console.log('Event Bus listening on port: 4005');
});
