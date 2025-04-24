import { Task } from '../types/types';

export type OrdenationType = "default" | "alphabetical" | "pending" | "completed";

export const orderTasks = (tasks: Task[], ordenation: OrdenationType): Task[] => {
  const copyTasks = [...tasks];

  return copyTasks.sort((a, b) => {
    if (ordenation === "alphabetical") {
      return a.text.localeCompare(b.text, "pt-BR");
    }

    if (ordenation === "completed" || ordenation === "pending") {
      const factor = ordenation === "completed" ? -1 : 1;
      if (a.completed !== b.completed) {
        return a.completed ? factor : -factor;
      }
    }
    return 0;
  });
};