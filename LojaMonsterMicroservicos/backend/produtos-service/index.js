const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let produtos = [
  { id: 1, nome: 'Monster Energy Original', preco: 10.0 },
  { id: 2, nome: 'Monster Ultra White', preco: 12.0 },
  { id: 3, nome: 'Monster Mango Loco', preco: 13.0 },
  { id: 4, nome: 'Monster Pipeline Punch', preco: 14.0 },
  { id: 5, nome: 'Monster Zero Ultra', preco: 11.0 }
];

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.listen(PORT, () => {
  console.log(`Produtos service rodando na porta ${PORT}`);
});
