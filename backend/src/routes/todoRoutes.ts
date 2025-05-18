import { Router, Request, Response, NextFunction } from "express";
import { TodoController } from "../controllers/TodoController";
import { authMiddleware } from '../middleware/authMiddleware';
import { TodoService } from "../services/TodoService";
import { TodoRepository } from "../repositories/TodoRepository";

const router = Router();
const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

router.use((req, res, next) => {
  authMiddleware(req, res, next);
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.create(req, res);
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.getAll(req, res);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.getById(req, res);
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.update(req, res);
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.delete(req, res);
});

export default router;
