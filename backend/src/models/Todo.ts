export interface Todo {
    id?: number;
    text: string;
    completed: boolean;
    is_deleted: boolean;
    created_at: Date;
    deleted_at?: Date | null;
    updated_at?: Date | null;
} 