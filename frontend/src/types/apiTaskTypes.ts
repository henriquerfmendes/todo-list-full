export interface ApiTask {
    id: number;
    text: string;
    completed: boolean;
    is_deleted: boolean;
    created_at: string;
    deleted_at: string | null;
    updated_at: string | null;
  }