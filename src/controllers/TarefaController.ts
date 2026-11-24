import { type Request, type Response } from "express";
import { type Tarefa } from "../types/tarefa.js";

let nextId = 3;
const tarefas: Tarefa[] = [
  {
    id: 1,
    title: "Estudar TypeScript",
    description: "Revisar interfaces, tipos e generics",
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "Ir ao mercado",
    description: "Comprar frutas, arroz, feijão e produtos de limpeza",
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export class TarefaController {
  // GET /tarefas
  static listar(req: Request, res: Response) {
    const { title, description } = req.query;

    const hasTitle = typeof title === "string" && title.trim() !== "";
    const hasDescription =
      typeof description === "string" && description.trim() !== "";

    let resultado = tarefas;

    if (hasTitle) {
      resultado = resultado.filter((t) =>
        t.title.toLowerCase().includes(title.trim().toLowerCase())
      );
    }

    if (hasDescription) {
      resultado = resultado.filter((t) =>
        t.description.toLowerCase().includes(description.trim().toLowerCase())
      );
    }

    return res.status(200).json(resultado);
  }

  // POST /tarefas
  static criar(req: Request, res: Response) {
    const { title, description } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ erro: "Título não informado" });
    }

    if (typeof description !== "string" || !description.trim()) {
      return res.status(400).json({ erro: "Descrição não informada" });
    }

    const newTask: Tarefa = {
      id: nextId++,
      title: title.trim(),
      description: description.trim(),
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    tarefas.push(newTask);
    return res.status(201).json(newTask);
  }

  // PUT /tarefas/:id
  static atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const { title, description } = req.body;
    const hasTitle = title !== undefined;
    const hasDescription = description !== undefined;

    if (!hasTitle && !hasDescription) {
      return res
        .status(400)
        .json({ erro: "Envie pelo menos title ou description" });
    }

    if (hasTitle && (typeof title !== "string" || !title.trim())) {
      return res.status(400).json({ erro: "Title inválido" });
    }

    if (
      hasDescription &&
      (typeof description !== "string" || !description.trim())
    ) {
      return res.status(400).json({ erro: "Description inválida" });
    }

    const tarefa = tarefas.find((t) => t.id === id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    if (hasTitle) tarefa.title = title.trim();
    if (hasDescription) tarefa.description = description.trim();
    tarefa.updated_at = new Date();

    return res.status(200).json(tarefa);
  }

  // PATCH /tarefas/:id/complete
  static alternarConclusao(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefa = tarefas.find((t) => t.id === id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    tarefa.completed_at = tarefa.completed_at ? null : new Date();
    tarefa.updated_at = new Date();

    return res.status(200).json(tarefa);
  }

  // DELETE /tarefas/:id
  static deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    tarefas.splice(index, 1);
    return res.status(204).send();
  }
}