import { Todo } from "../models/Todo";
import { ITodoRepository } from "../repositories/interfaces/ITodoRepository";
import { AppError } from "../errors/AppError";
import {
  validateText,
  validateUpdateFields,
} from "../validations/todoValidations";

export class TodoService {
  constructor(private todoRepository: ITodoRepository) {}

  async create(text: string, userId: string, token: string): Promise<Todo> {
    validateText(text);

    const tasksCount = await this.getUserTasksCount(userId, token);
    if (tasksCount >= Number(process.env.MAX_TASKS_PER_USER)) {
      throw new AppError("User has reached the maximum number of tasks", 403);
    }

    return this.todoRepository.create(
      {
        text: text.trim(),
        completed: false,
        created_at: new Date(),
        is_deleted: false,
        deleted_at: null,
        updated_at: null,
      },
      userId,
      token
    );
  }

  async getAll(userId: string, token: string): Promise<Todo[]> {
    return this.todoRepository.findAll(userId, token);
  }

  async getById(
    id: number,
    userId: string,
    token: string
  ): Promise<Todo | null> {
    const todo = await this.todoRepository.findById(id, userId, token);
    if (!todo) {
      throw new AppError(`Todo with id ${id} not found`, 404);
    }
    return todo;
  }

  async update(
    id: number,
    updates: Partial<Todo>,
    userId: string,
    token: string
  ): Promise<Todo | null> {
    await this.getById(id, userId, token);

    validateUpdateFields(updates.text, updates.completed);

    const updatedFields: Partial<Todo> = {
      ...updates,
      updated_at: new Date(),
    };

    return this.todoRepository.update(id, updatedFields, userId, token);
  }

  async delete(id: number, userId: string, token: string): Promise<void> {
    await this.getById(id, userId, token);

    const updates = {
      is_deleted: true,
      deleted_at: new Date(),
    };

    await this.todoRepository.update(id, updates, userId, token);
  }

  async getUserTasksCount(userId: string, token: string): Promise<number> {
    return this.todoRepository.countTasksByUserId(userId, token);
  }
}
