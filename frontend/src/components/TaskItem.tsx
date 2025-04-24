import { useState, useRef, useEffect } from 'react';
import { Task } from '../types/types';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, data: Partial<Task>) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
}

function TaskItem({ task, onUpdate, onRemove }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const saveEdit = async () => {
    if (editText.trim()) {
      await onUpdate(task.id, { text: editText });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      cancelEditing();
    } else if (e.key === 'Enter') {
      saveEdit();
    }
  };

  return (
    <li className="flex items-center justify-between py-3 px-3 border-b border-gray-800 hover:bg-gray-800/50 transition-colors rounded-md group">
      <div className="flex items-center flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
        />
        
        {isEditing ? (
          <div className="ml-3 flex-1 min-w-0">
            <input
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2 mt-1">
              <button
                aria-label="save"
                onClick={saveEdit}
                className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
              >
                Save
              </button>
              <button
                aria-label="cancel"
                onClick={cancelEditing}
                className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <span
            className={`ml-3 truncate ${
              task.completed
                ? "line-through text-gray-500"
                : "text-gray-200"
            }`}
          >
            {task.text}
          </span>
        )}
      </div>
      
      {!isEditing && (
        <div className="flex gap-2">
          <button
            onClick={startEditing}
            className="text-gray-500 hover:text-blue-400 focus:outline-none transition-colors opacity-0 group-hover:opacity-100"
            aria-label="edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <button
            onClick={() => onRemove(task.id)}
            className="text-gray-500 hover:text-red-400 focus:outline-none transition-colors opacity-0 group-hover:opacity-100"
            aria-label="delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
} 
export default TaskItem;