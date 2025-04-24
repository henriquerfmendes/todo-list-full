export type Task = {  
    id: number;
    text: string;
    completed: boolean;
  };    
  
  export interface TaskState {
    items: Task[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface TaskActions {
    fetchTasks: () => Promise<void>;
    addTask: (text: string) => Promise<void>;
    updateTask: (id: number, updates: { text?: string; completed?: boolean }) => Promise<Task>;
    removeTask: (id: number) => Promise<void>;
  }
  
  export type TaskStore = TaskState & TaskActions;
