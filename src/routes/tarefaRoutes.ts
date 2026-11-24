import { Router } from "express";
import { TarefaController } from "../controllers/TarefaController.js";

const tarefaRoutes = Router();

tarefaRoutes.get("/", TarefaController.listar);
tarefaRoutes.post("/", TarefaController.criar);
tarefaRoutes.put("/:id", TarefaController.atualizar);
tarefaRoutes.patch("/:id/complete", TarefaController.alternarConclusao);
tarefaRoutes.delete("/:id", TarefaController.deletar);

export { tarefaRoutes };