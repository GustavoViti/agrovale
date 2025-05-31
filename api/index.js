import express from 'express';
import cors from 'cors';
import pedidosRouter from './routes/pedidos.js';
import produtosRouter from './routes/produtos.js';

const app = express();  // crie o app antes de usar ele

app.use(cors());
app.use(express.json());

app.use('/api/produtos', produtosRouter);
app.use('/api/pedidos', pedidosRouter);  // use os routers após criar o app

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
