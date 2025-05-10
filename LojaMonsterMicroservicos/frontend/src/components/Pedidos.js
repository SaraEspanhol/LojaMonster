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
      console.error(err);
    }
  };

  return (
    <div className="container text-center">
      <h2 className="mb-4">Pedidos Realizados</h2>
      {pedidos.map(pedido => (
        <div key={pedido.id} className="card mb-4 p-3 text-light bg-dark">
          <h5>Pedido ID: {pedido.id}</h5>
          <p>
            Data:{' '}
            {pedido.data
              ? new Date(pedido.data).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Data indisponível'}
          </p>
          <ul className="list-group">
            {pedido.produtos.map((item, index) => (
              <li key={index} className="list-group-item bg-secondary text-light">
                {item.nome} - Quantidade: {item.quantidade}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Pedidos;
