import React, { useState, useEffect } from 'react';
import { Todo, TodoFormData } from '../../types';

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  initialData?: Todo | null;
  onCancel?: () => void;
}

const TodoForm = ({ onSubmit, initialData = null, onCancel = undefined }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Incomplete' | 'Complete'>('Incomplete');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    if (!initialData) {
      setTitle('');
      setDescription('');
      setStatus('Incomplete');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h3 className="text-xl font-semibold mb-4 text-indigo-600">
        {initialData ? 'Edit Task' : 'Create New Task'}
      </h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Task Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Status</label>
        <select
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Incomplete' | 'Complete')}
        >
          <option value="Incomplete">Incomplete</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {initialData ? 'Update' : 'Add Task'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
