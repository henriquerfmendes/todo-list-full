import { Todo } from '../../models/Todo';

export interface ITodoRepository {
    create(todo: Omit<Todo, 'id'>, userId: string, token: string): Promise<Todo>;
    findAll(userId: string, token: string): Promise<Todo[]>;
    findById(id: number, userId: string, token: string): Promise<Todo | null>;
    delete(id: number, userId: string, token: string): Promise<void>;
    update(id: number, todo: Partial<Todo>, userId: string, token: string): Promise<Todo | null>;
    countTasksByUserId(userId: string, token: string): Promise<number>;
} 