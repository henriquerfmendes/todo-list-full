import { useEffect, useRef } from "react";
import useTodoStore from "../store/useTodoStore";
import { OrdenationType, orderTasks } from "./OrderTasks";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskOrderSelector from "./TaskOrderSelector";
import TaskStats from "./TaskStats";
import { useState } from "react";

function TaskList() {
  const [ordenation, setOrdenation] = useState<OrdenationType>("default");
  const {
    items,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    removeTask,
  } = useTodoStore();

  const initialFetchRef = useRef(false);

  useEffect(() => {
    if (!initialFetchRef.current) {
      fetchTasks();
      initialFetchRef.current = true;
    }
  }, [fetchTasks]);

  const orderedTasks = orderTasks(items, ordenation);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl text-center font-bold text-white">
            Task Manager
          </h1>
        </header>

        <TaskForm onAddTask={addTask} />

        {error && (
          <div
            className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!isLoading && items.length === 0 && !error && (
          <p className="text-center text-gray-400">No tasks added yet</p>
        )}

        {items.length > 0 && (
          <>
            <TaskOrderSelector
              ordenation={ordenation}
              setOrdenation={setOrdenation}
            />

            <ul className="space-y-2">
              {orderedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={async (id, updates) => {
                    await updateTask(id, updates);
                  }}
                  onRemove={removeTask}
                />
              ))}
            </ul>

            <TaskStats tasks={items} />
          </>
        )}
      </div>
    </div>
  );
}

export default TaskList;
