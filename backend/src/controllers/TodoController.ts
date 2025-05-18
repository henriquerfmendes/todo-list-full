import { Request, Response } from "express";
import { TodoService } from "../services/TodoService";
import { getAuthInfo } from "../middleware/authMiddleware";

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAll(req: Request, res: Response) {
    try {
      const { userId, token } = getAuthInfo(req);
      const todos = await this.todoService.getAll(userId, token);
      return res.json({ data: todos });
    } catch (error) {
      console.error("Error in getAll:", error);
      return res.status(500).json({ error: "Failed to fetch todos" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { userId, token } = getAuthInfo(req);
      const todo = await this.todoService.getById(id, userId, token);
      return res.json(todo);
    } catch (error) {
      console.error("Error in getById:", error);
      return res
        .status(500)
        .json({ error: `Failed to fetch todo ${req.params.id}` });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { text } = req.body;
      const { userId, token } = getAuthInfo(req);
      const todo = await this.todoService.create(text, userId, token);
      return res.status(201).json(todo);
    } catch (error) {
      console.error("Error in create:", error);
      return res.status(500).json({ error: "Failed to create todo" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const { userId, token } = getAuthInfo(req);
      const todo = await this.todoService.update(id, updates, userId, token);
      return res.json(todo);
    } catch (error) {
      console.error("Error in update:", error);
      return res
        .status(500)
        .json({ error: `Failed to update todo ${req.params.id}` });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { userId, token } = getAuthInfo(req);
      await this.todoService.delete(id, userId, token);
      return res.status(204).send();
    } catch (error) {
      console.error("Error in delete:", error);
      return res
        .status(500)
        .json({ error: `Failed to delete todo ${req.params.id}` });
    }
  }
}
