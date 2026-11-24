import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

interface Tarefa {
  id: number;
  title: string;
  description: string;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
