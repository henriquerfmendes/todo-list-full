import { Todo } from '../../models/Todo';

export interface ITodoRepository {
    create(todo: Omit<Todo, 'id'>): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findById(id: number): Promise<Todo | null>;
    delete(id: number): Promise<void>;
    update(id: number, todo: Partial<Todo>): Promise<Todo | null>;
} 