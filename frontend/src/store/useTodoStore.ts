import { create } from "zustand";
import { TaskStore } from "../types/types";
import { todoApi } from "../services/api";
import { devtools } from "zustand/middleware";

const useTodoStore = create<TaskStore>()(
  devtools(
    (set) => ({
      items: [],
      isLoading: false,
      error: null,

      addTask: async (text: string) => {
        set({ isLoading: true, error: null });
        try {
          const newTask = await todoApi.create(text);
          set((state) => ({
            items: [...state.items, newTask],
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to add task",
            isLoading: false,
          });
        }
      },

      fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
          const tasks = await todoApi.getAll();
          set({ items: tasks, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to fetch tasks",
            isLoading: false,
          });
        }
      },

      updateTask: async (
        id: number,
        updates: { text?: string; completed?: boolean }
      ) => {
        set({ isLoading: true, error: null });
        try {
          const updatedTask = await todoApi.update(id, updates);

          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? updatedTask : item
            ),
            isLoading: false,
          }));
          return updatedTask;
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to update task",
            isLoading: false,
          });
          throw error;
        }
      },

      removeTask: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          await todoApi.delete(id);
          set((state) => ({
            items: state.items.filter((task) => task.id !== id),
            isLoading: false,
            error: null,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to delete task",
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    { name: "TodoStore" }
  )
);

export default useTodoStore;
