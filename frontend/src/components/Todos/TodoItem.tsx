import React from 'react';
import { Todo } from '../../types';

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem = ({ todo, onToggleStatus, onDelete, onEdit }: TodoItemProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between mb-3 hover:shadow-md transition">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.status === 'Complete'}
            onChange={() => onToggleStatus(todo)}
            className="w-5 h-5 cursor-pointer accent-indigo-600"
          />
          <h4 className={`text-lg font-medium ${todo.status === 'Complete' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.title}
          </h4>
        </div>
        {todo.description && (
          <p className={`mt-1 text-sm ${todo.status === 'Complete' ? 'text-gray-300' : 'text-gray-600'}`}>
            {todo.description}
          </p>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(todo)}
          className="text-blue-500 hover:text-blue-700 p-1"
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="text-red-500 hover:text-red-700 p-1"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
