import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProdutoList from './components/ProdutoList';
import PedidoForm from './components/PedidoForm';
import PedidoList from './components/PedidoList';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchProdutos();
    fetchPedidos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/produtos');
      setProdutos(res.data);
    } catch (error) {
      alert('Erro ao carregar produtos.');
    }
  };

  const fetchPedidos = async () => {
    try {
      const res = await axios.get('http://localhost:3002/pedidos');
      setPedidos(res.data);
    } catch (error) {
      alert('Erro ao carregar pedidos.');
    }
  };

  const criarPedido = async (pedido) => {
    try {
      await axios.post('http://localhost:3002/pedidos', pedido);
      alert('Pedido criado com sucesso!');
      fetchPedidos();
    } catch (error) {
      alert('Erro ao criar pedido.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Loja Monster</h1>
      <ProdutoList produtos={produtos} />
      <PedidoForm produtos={produtos} onCriarPedido={criarPedido} />
      <PedidoList pedidos={pedidos} />
    </div>
  );
}

export default App;
