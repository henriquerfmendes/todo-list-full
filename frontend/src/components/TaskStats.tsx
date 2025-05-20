import { Task } from "../types/types";

interface TaskStatsProps {
  tasks: Task[];
}

function TaskStats({ tasks }: TaskStatsProps) {
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700 font-mono">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 justify-center sm:justify-start" data-testid="pending-stats">
          <div className="h-3 w-3 rounded-full bg-amber-400"></div>
          <span className="text-gray-300">
            Pending:{" "}
            <span className="font-bold text-amber-400">{pendingCount}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 justify-center sm:justify-center" data-testid="completed-stats">
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
          <span className="text-gray-300">
            Completed:{" "}
            <span className="font-bold text-green-400">{completedCount}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 justify-center sm:justify-end" data-testid="total-stats">
          <div className="h-3 w-3 rounded-full bg-blue-400"></div>
          <span className="text-gray-300">
            Total: <span className="font-bold text-blue-400">{totalCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskStats;
