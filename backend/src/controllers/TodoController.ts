import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/TodoService";
import { TodoRepository } from "../repositories/TodoRepository";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    const todoRepository = new TodoRepository();
    this.todoService = new TodoService(todoRepository);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { text } = req.body;
      const todo = await this.todoService.create(text);
      return res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await this.todoService.getAll();
      return res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todo = await this.todoService.getById(Number(id));
      return res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { text, completed } = req.body;
      const todo = await this.todoService.update(Number(id), {
        text,
        completed,
      });
      return res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.todoService.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
