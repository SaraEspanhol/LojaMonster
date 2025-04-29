import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const res = await axios.get('http://localhost:3002/pedidos');
      setPedidos(res.data);
    } catch (err) {
      alert('Erro ao carregar pedidos');
    }
  };

  return (
    <div>
      <h2>Pedidos Realizados</h2>
      {pedidos.map(pedido => (
        <div key={pedido.id} style={{ border: '1px solid black', marginBottom: '1rem', padding: '1rem' }}>
          <h4>Pedido ID: {pedido.id}</h4>
          <p>Data: {new Date(pedido.data).toLocaleString()}</p>
          <ul>
            {pedido.itens.map((item, index) => (
              <li key={index}>{item.nomeProduto} - Quantidade: {item.quantidade}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Pedidos;
