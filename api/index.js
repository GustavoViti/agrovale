import express from 'express';
import cors from 'cors';
import produtosRouter from './routes/produtos.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/produtos', produtosRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
