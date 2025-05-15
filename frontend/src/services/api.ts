import { ApiTask } from "../types/apiTaskTypes";
import { Task } from "../types/types";
import { authService } from "./authService";

const mapApiTaskToTask = (apiTask: ApiTask): Task => ({
  id: apiTask.id,
  text: apiTask.text,
  completed: apiTask.completed,
});

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = authService.getSession();

  if (!session || authService.isTokenExpired()) {
    throw new Error("Session expired");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.access_token}`,
    ...options.headers,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.error,
      code: data.code,
    };
  }

  return data;
}

export const todoApi = {
  async create(text: string): Promise<Task> {
    const data = await fetchWithAuth("/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    return mapApiTaskToTask(data);
  },

  async getAll(): Promise<Task[]> {
    const data = await fetchWithAuth("/todos");
    return data.data.map(mapApiTaskToTask);
  },

  async getById(id: number): Promise<Task> {
    const data = await fetchWithAuth(`/todos/${id}`);
    return mapApiTaskToTask(data);
  },

  async update(
    id: number,
    updates: { text?: string; completed?: boolean }
  ): Promise<Task> {
    const data = await fetchWithAuth(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    return mapApiTaskToTask(data);
  },

  async delete(id: number): Promise<void> {
    await fetchWithAuth(`/todos/${id}`, {
      method: "DELETE",
    });
  },
};
