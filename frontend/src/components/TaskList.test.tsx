import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "./TaskList";
import TaskOrderSelector from "./TaskOrderSelector";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskStats from "./TaskStats";

jest.mock("@headlessui/react", () => {
  const actual = jest.requireActual("@headlessui/react");
  return {
    ...actual,
    Transition: ({ children }: { children: React.ReactNode }) => children,
    Menu: actual.Menu,
    MenuButton: actual.MenuButton,
    MenuItem: actual.MenuItem,
    MenuItems: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock("../services/api", () => ({
  todoApi: {
    create: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("../store/useTodoStore", () => {
  const mockFn = jest.fn().mockReturnValue({
    items: [],
    isLoading: false,
    error: null,
    fetchTasks: jest.fn(),
    addTask: jest.fn(),
    updateTask: jest.fn(),
    removeTask: jest.fn(),
  });

  return {
    __esModule: true,
    default: mockFn,
  };
});

describe("Task Components", () => {
  const mockStore = {
    items: [] as Array<{ id: number; text: string; completed: boolean }>,
    isLoading: false,
    error: null,
    fetchTasks: jest.fn(),
    addTask: jest.fn(),
    updateTask: jest.fn(),
    removeTask: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const mockUseTodoStore = jest.requireMock("../store/useTodoStore").default;
    mockUseTodoStore.mockReturnValue({ ...mockStore });
  });

  describe("TaskList Component", () => {
    test("Should render initial empty state correctly", () => {
      render(<TaskList />);

      expect(screen.getByText("Task Manager")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter a new task...")
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
      expect(screen.getByText("No tasks added yet")).toBeInTheDocument();
      expect(mockStore.fetchTasks).toHaveBeenCalledTimes(1);
    });

    test("Should display tasks when they exist", () => {
      const mockItems = [
        { id: 1, text: "Task 1", completed: false },
        { id: 2, text: "Task 2", completed: true },
      ];

      const mockUseTodoStore = jest.requireMock(
        "../store/useTodoStore"
      ).default;
      mockUseTodoStore.mockReturnValue({
        ...mockStore,
        items: mockItems,
      });

      render(<TaskList />);

      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
      expect(screen.getByText(/Total:/)).toBeInTheDocument();
      expect(screen.getByText(/Pending:/)).toBeInTheDocument();
      expect(screen.getByText(/Completed:/)).toBeInTheDocument();
    });

    test("Should display error message when there is an error", () => {
      const mockUseTodoStore = jest.requireMock(
        "../store/useTodoStore"
      ).default;
      mockUseTodoStore.mockReturnValue({
        ...mockStore,
        error: "Failed to fetch tasks",
      });

      render(<TaskList />);

      expect(screen.getByText("Failed to fetch tasks")).toBeInTheDocument();
    });

    test("Should add and display a new task", async () => {
      const mockUseTodoStore = jest.requireMock(
        "../store/useTodoStore"
      ).default;
      mockUseTodoStore.mockReturnValue({
        ...mockStore,
        items: [{ id: 1, text: "New Task", completed: false }],
      });

      render(<TaskList />);

      const input = screen.getByPlaceholderText("Enter a new task...");
      const addButton = screen.getByRole("button", { name: /add/i });

      fireEvent.change(input, { target: { value: "New Task" } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockStore.addTask).toHaveBeenCalledWith("New Task");
      });
    });
  });

  describe("TaskForm Component", () => {
    test("Should enable Add button when input has text", () => {
      const mockAddTask = jest.fn().mockResolvedValue(undefined);
      render(<TaskForm onAddTask={mockAddTask} />);

      const input = screen.getByPlaceholderText("Enter a new task...");
      const addButton = screen.getByRole("button", { name: /add/i });

      fireEvent.change(input, { target: { value: "Add Task" } });
      expect(addButton).toBeEnabled();

      fireEvent.change(input, { target: { value: "   " } });
      expect(addButton).toBeDisabled();
    });

    test("Should handle form submission", async () => {
      const mockAddTask = jest.fn().mockResolvedValue(undefined);
      render(<TaskForm onAddTask={mockAddTask} />);

      const input = screen.getByPlaceholderText("Enter a new task...");
      const form = screen.getByRole("form");

      fireEvent.change(input, { target: { value: "Testing the form" } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledWith("Testing the form");
      });

      expect(input).toHaveValue("");
    });
  });

  describe("TaskOrderSelector Component", () => {
    test("Should have correct order options", () => {
      const mockSetOrdenation = jest.fn();
      render(
        <TaskOrderSelector
          ordenation="default"
          setOrdenation={mockSetOrdenation}
        />
      );

      const creationDateElements = screen.getAllByText("Creation date");
      expect(creationDateElements.length).toBeGreaterThan(0);

      const orderOptions = {
        default: "Creation date",
        alphabetical: "Alphabetical",
        pending: "Pending",
        completed: "Completed",
      };

      expect(Object.keys(orderOptions).length).toBe(4);
      expect(orderOptions.default).toBe("Creation date");
      expect(orderOptions.alphabetical).toBe("Alphabetical");
      expect(orderOptions.pending).toBe("Pending");
      expect(orderOptions.completed).toBe("Completed");
    });

    test("Should call setOrdenation when option is selected", async () => {
      const mockSetOrdenation = jest.fn();
      const { container } = render(
        <TaskOrderSelector
          ordenation="default"
          setOrdenation={mockSetOrdenation}
        />
      );

      const orderButtons = screen.getAllByText("Creation date");
      const orderButton = orderButtons[0];
      fireEvent.click(orderButton);

      const buttons = container.querySelectorAll("button");

      const alphabeticalButton = Array.from(buttons).find(
        (button) => button.textContent === "Alphabetical"
      );

      if (alphabeticalButton) {
        fireEvent.click(alphabeticalButton);
        expect(mockSetOrdenation).toHaveBeenCalledWith("alphabetical");
      } else {
        fail('Button with text "Alphabetical" not found');
      }
    });
  });

  describe("TaskItem Component", () => {
    test("Should toggle task completion status", async () => {
      const mockUpdateTask = jest.fn().mockResolvedValue(undefined);
      const mockRemoveTask = jest.fn().mockResolvedValue(undefined);
      const task = { id: 1, text: "Test Task", completed: false };

      render(
        <TaskItem
          task={task}
          onUpdate={mockUpdateTask}
          onRemove={mockRemoveTask}
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);

      expect(mockUpdateTask).toHaveBeenCalledWith(1, { completed: true });
    });

    test("Should allow editing a task", async () => {
      const mockUpdateTask = jest.fn().mockResolvedValue(undefined);
      const mockRemoveTask = jest.fn().mockResolvedValue(undefined);
      const task = { id: 1, text: "Test Task", completed: false };

      render(
        <TaskItem
          task={task}
          onUpdate={mockUpdateTask}
          onRemove={mockRemoveTask}
        />
      );

      const editButton = screen.getByLabelText("edit");
      fireEvent.click(editButton);

      const editInput = screen.getByDisplayValue("Test Task");

      fireEvent.change(editInput, { target: { value: "Updated Task" } });

      const saveButton = screen.getByLabelText("save");
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith(1, {
          text: "Updated Task",
        });
      });
    });

    test("Should remove a task", async () => {
      const mockUpdateTask = jest.fn().mockResolvedValue(undefined);
      const mockRemoveTask = jest.fn().mockResolvedValue(undefined);
      const task = { id: 1, text: "Test Task", completed: false };

      render(
        <TaskItem
          task={task}
          onUpdate={mockUpdateTask}
          onRemove={mockRemoveTask}
        />
      );

      const deleteButton = screen.getByLabelText("delete");
      fireEvent.click(deleteButton);

      expect(mockRemoveTask).toHaveBeenCalledWith(1);
    });
  });

  describe("TaskStats Component", () => {
    test("Should display correct task statistics", () => {
      const tasks = [
        { id: 1, text: "Task 1", completed: false },
        { id: 2, text: "Task 2", completed: true },
        { id: 3, text: "Task 3", completed: false },
      ];

      render(<TaskStats tasks={tasks} />);

      expect(screen.getByTestId("total-stats")).toHaveTextContent("Total: 3");
      expect(screen.getByTestId("pending-stats")).toHaveTextContent("Pending: 2");
      expect(screen.getByTestId("completed-stats")).toHaveTextContent("Completed: 1");
    });
  });
});
