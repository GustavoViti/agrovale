// db.js
import mysql from 'mysql2/promise';

// Criar e exportar diretamente o pool de conexões
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Nestle573@',
  database: 'agrovale_produtos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Log para verificar se conectou corretamente (opcional)
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    connection.release();
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
})();

export { pool };
