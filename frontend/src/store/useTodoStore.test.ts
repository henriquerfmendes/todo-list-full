import useTodoStore from "./useTodoStore";
import { todoApi } from "../services/api";

jest.mock("../services/api", () => ({
  todoApi: {
    create: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("useTodoStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useTodoStore.setState({ 
      items: [], 
      isLoading: false, 
      error: null 
    });
  });

  test("Should initialize with empty state", () => {
    const state = useTodoStore.getState();
    expect(state.items).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test("Should add a new task", async () => {
    const mockTask = { id: 1, text: "New task", completed: false };
    (todoApi.create as jest.Mock).mockResolvedValue(mockTask);
    
    const { addTask } = useTodoStore.getState();
    await addTask("New task");

    expect(todoApi.create).toHaveBeenCalledWith("New task");
    
    const { items } = useTodoStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(mockTask);
  });

  test("Should update a task", async () => {
    const initialTask = { id: 1, text: "Task to update", completed: false };
    useTodoStore.setState({ items: [initialTask], isLoading: false, error: null });
    
    const updatedTask = { ...initialTask, text: "Updated task", completed: true };
    (todoApi.update as jest.Mock).mockResolvedValue(updatedTask);
    
    const { updateTask } = useTodoStore.getState();
    await updateTask(1, { text: "Updated task", completed: true });
    
    expect(todoApi.update).toHaveBeenCalledWith(1, { text: "Updated task", completed: true });
    
    const { items } = useTodoStore.getState();
    expect(items[0]).toEqual(updatedTask);
  });

  test("Should remove a task", async () => {
    useTodoStore.setState({ 
      items: [
        { id: 1, text: "Task 1", completed: false },
        { id: 2, text: "Task 2", completed: false }
      ], 
      isLoading: false, 
      error: null 
    });
    
    (todoApi.delete as jest.Mock).mockResolvedValue(undefined);
    
    const { removeTask } = useTodoStore.getState();
    await removeTask(1);
    
    expect(todoApi.delete).toHaveBeenCalledWith(1);
    
    const { items } = useTodoStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(2);
  });

  test("Should handle API errors when fetching tasks", async () => {
    const errorMessage = "Network error";
    (todoApi.getAll as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
    const { fetchTasks } = useTodoStore.getState();
    await fetchTasks();
    
    const { error, isLoading } = useTodoStore.getState();
    expect(error).toBe(errorMessage);
    expect(isLoading).toBe(false);
  });
});
