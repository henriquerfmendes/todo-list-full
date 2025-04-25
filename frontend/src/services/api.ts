import { Task } from "../types/types";

const API_URL = "http://localhost:3001/api";

export interface ApiTask {
  id: number;
  text: string;
  completed: boolean;
  is_deleted: boolean;
  created_at: string;
  deleted_at: string | null;
  updated_at: string | null;
}

const mapApiTaskToTask = (apiTask: ApiTask): Task => ({
  id: apiTask.id,
  text: apiTask.text,
  completed: apiTask.completed,
});

export const todoApi = {
  async create(text: string): Promise<Task> {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return mapApiTaskToTask(data);
    } catch (error) {
      console.error("Failed to create task: ", error);
      throw error;
    }
  },

  async getAll(): Promise<Task[]> {
    try {
      const response = await fetch(`${API_URL}/todos`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.data.map(mapApiTaskToTask);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw error;
    }
  },

  async getById(id: number): Promise<Task> {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return mapApiTaskToTask(data);
    } catch (error) {
      console.error(`Failed to fetch task ${id}: `, error);
      throw error;
    }
  },

  async update(
    id: number,
    updates: { text?: string; completed?: boolean }
  ): Promise<Task> {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return mapApiTaskToTask(data);
    } catch (error) {
      console.error(`Failed to update task ${id}: `, error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Failed to delete task ${id}:`, error);
      throw error;
    }
  },
};
