import { Router, Request, Response, NextFunction } from "express";
import { TodoController } from "../controllers/TodoController";

const router = Router();
const todoController = new TodoController();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.create(req, res, next);
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.getAll(req, res, next);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.getById(req, res, next);
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.update(req, res, next);
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await todoController.delete(req, res, next);
});

export default router;
