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
    <div className="container text-center">
      <h2 className="mb-4">Pedidos Realizados</h2>
      {pedidos.map(pedido => (
        <div key={pedido.id} className="card mb-4 p-3 text-light bg-dark">
          <h5>Pedido ID: {pedido.id}</h5>
          <p>Data: {new Date(pedido.data).toLocaleString()}</p>
          <ul className="list-group">
            {pedido.itens.map((item, index) => (
              <li key={index} className="list-group-item bg-secondary text-light">
                {item.nomeProduto} - Quantidade: {item.quantidade}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Pedidos;
