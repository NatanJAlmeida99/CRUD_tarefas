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

const tarefas: Tarefa[] = [
  {
    id: 1,
    title: "Lavar a louça",
    description: "Revisar interfaces, tipos e generics",
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "Ir ao mercado",
    description: "Compra frutas, arroz, feijão e produtos de limpeza",
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

app.get("/tarefa", (req: Request, res: Response) => {
  res.status(200).json({ tarefas });
});

app.post("/tarefa", (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ erro: "Titulo não informado" });
  }

  if (typeof description !== "string" || !description.trim()) {
    return res.status(400).json({ erro: "Descrição não informada" });
  }

  const newTask: Tarefa = {
    id: tarefas.length + 1,
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  tarefas.push(newTask);

  return res.status(201).json({ newTask });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
