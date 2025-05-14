import express from 'express';
import { pool } from '../db.js'; // Importar o pool de conexões
const router = express.Router();

// Gerar código interno automático
function gerarCodigoInterno() {
  return 'INT' + Date.now().toString().slice(-6);
}

// Criar produto
router.post('/', async (req, res) => {
  const {
    nome,
    marca,
    preco_custo,
    margem_lucro,
    preco_venda,
    categoria,
    codigo_externo,
    descricao,
    estoque = 0 // valor padrão se não for enviado
  } = req.body;

  console.log('Dados recebidos:', req.body); // Logar os dados para verificar se está tudo correto

  // Gerar código interno
  const codigo_interno = gerarCodigoInterno();
  console.log('Código interno gerado:', codigo_interno); // Log para verificar o código gerado

  // Verificar se valores obrigatórios estão definidos
  if (!nome || !preco_custo || !preco_venda) {
    return res.status(400).send('Nome, preço de custo e preço de venda são obrigatórios.');
  }

  // Garantir que nenhum valor seja undefined, substituindo por null
  const valores = [
  nome,
  marca,
  preco_custo,
  margem_lucro,
  preco_venda,
  categoria,
  codigo_interno,   // <- agora está na posição correta
  codigo_externo,
  descricao,
  estoque
];


  // Substituir undefined por null
  const valoresTratados = valores.map(value => value === undefined ? null : value);

  console.log('Valores tratados:', valoresTratados); // Logar os valores tratados antes de enviar para o banco

  try {
    // Passar valores para a consulta SQL usando pool.query
    const [result] = await pool.query(
      `INSERT INTO produtos 
        (nome, marca, preco_custo, margem_lucro, preco_venda, categoria, codigo_interno, codigo_externo, descricao, estoque)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      valoresTratados
    );

    // Retornar a resposta com sucesso
    res.status(201).json({ id: result.insertId, codigo_interno });

  } catch (err) {
    console.error('Erro ao cadastrar produto:', err.message); // Log detalhado do erro
    res.status(500).send('Erro ao cadastrar produto.');
  }
});

// Listar produtos
router.get('/', async (req, res) => {
  try {
    const [produtos] = await pool.query('SELECT * FROM produtos ORDER BY nome');
    res.json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err.message); // Log detalhado do erro
    res.status(500).send('Erro ao buscar produtos.');
  }
});

// Atualizar estoque
router.put('/:id/estoque', async (req, res) => {
  const { id } = req.params;
  const { novoEstoque } = req.body;

  try {
    await pool.query('UPDATE produtos SET estoque = ? WHERE id = ?', [novoEstoque, id]);
    res.send('Estoque atualizado com sucesso.');
  } catch (err) {
    console.error('Erro ao atualizar estoque:', err.message); // Log detalhado do erro
    res.status(500).send('Erro ao atualizar estoque.');
  }
});

export default router;
