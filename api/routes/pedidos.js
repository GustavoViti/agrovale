import express from 'express';
import { pool } from '../db.js';
import { db as firestore } from '../config/firebase.js'; // já está inicializado

const router = express.Router();

// Rota para criar pedido
router.post('/', async (req, res) => {
  const { uid, produtos } = req.body; 

  if (!uid || !Array.isArray(produtos) || produtos.length === 0) {
    return res.status(400).json({ error: 'UID e lista de produtos são obrigatórios.' });
  }

  try {
    // Buscar dados do cliente no Firestore
    const userDoc = await firestore.collection('usuariosComplementar').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado no Firestore.' });
    }

    const userData = userDoc.data();

    // Buscar dados dos produtos no MySQL
    const produtosIds = produtos.map(p => p.id);
    const [produtosDB] = await pool.query(
      `SELECT id, nome, preco_venda FROM produtos WHERE id IN (?)`, 
      [produtosIds]
    );

    const mapProdutosDB = {};
    produtosDB.forEach(p => mapProdutosDB[p.id] = p);

    // Verificar se todos os produtos existem
    for (const p of produtos) {
      if (!mapProdutosDB[p.id]) {
        return res.status(400).json({ error: `Produto ID ${p.id} não encontrado.` });
      }
    }

    // Inserir o pedido na tabela pedidos
    const [resultPedido] = await pool.query(
      `INSERT INTO pedidos (cliente_nome, cliente_cpf, cliente_telefone, cliente_endereco) VALUES (?, ?, ?, ?)`,
      [
        userData.nome,
        userData.cpf,
        userData.telefone,
        JSON.stringify(userData.endereco)
      ]
    );

    const pedidoId = resultPedido.insertId;

    // Inserir cada produto no pedido
    const valoresPedidoProdutos = produtos.map(p => [
      pedidoId,
      p.id,
      p.quantidade,
      mapProdutosDB[p.id].preco_venda
    ]);

    await pool.query(
      `INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade, preco_unitario) VALUES ?`,
      [valoresPedidoProdutos]
    );

    res.status(201).json({ message: 'Pedido criado com sucesso!', pedidoId });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido.' });
  }
});

export default router;
