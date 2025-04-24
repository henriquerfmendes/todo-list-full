import { Todo } from "../models/Todo";
import { ITodoRepository } from "../repositories/interfaces/ITodoRepository";
import { AppError } from "../errors/AppError";
import {
  validateText,
  validateUpdateFields,
} from "../validations/todoValidations";

export class TodoService {
  constructor(private todoRepository: ITodoRepository) {}

  async create(text: string): Promise<Todo> {
    validateText(text);

    return this.todoRepository.create({
      text: text.trim(),
      completed: false,
      created_at: new Date(),
      is_deleted: false,
      deleted_at: null,
      updated_at: null,
    });
  }

  async getAll(): Promise<{ data: Todo[]; message?: string }> {
    const todos = await this.todoRepository.findAll();

    if (todos.length === 0) {
      return {
        data: [],
        message: "No tasks found",
      };
    }

    return { data: todos };
  }

  async getById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new AppError("Task not found", 404);
    }
    return todo;
  }

  async update(
    id: number,
    data: { text?: string; completed?: boolean }
  ): Promise<Todo> {
    const existingTodo = await this.todoRepository.findById(id);
    if (!existingTodo) {
      throw new AppError("Task not found", 404);
    }

    validateUpdateFields(data.text, data.completed);

    const updateData: Partial<Todo> = {
      updated_at: new Date(),
    };

    if (data.text) {
      updateData.text = data.text.trim();
    }

    if (data.completed !== undefined) {
      updateData.completed = data.completed;
    }

    const updatedTodo = await this.todoRepository.update(id, updateData);

    if (!updatedTodo) {
      throw new AppError("Failed to update task", 500);
    }

    return updatedTodo;
  }

  async delete(id: number): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new AppError("Task not found", 404);
    }
    await this.todoRepository.delete(id);
  }
}
