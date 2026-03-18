import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Todo, TodoFormData } from '../../types';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // States for Filter, Sort, Search
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for Editing
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus) params.append('status', filterStatus);
      if (sortOrder) params.append('sort', sortOrder);
      if (searchQuery) params.append('search', searchQuery);
      
      const queryString = params.toString();
      const endpoint = queryString ? `/todos?${queryString}` : '/todos';
      
      const data = await api(endpoint);
      setTodos(data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filterStatus, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTodos();
  };

  const handleCreate = async (todoData: TodoFormData) => {
    try {
      await api('/todos', {
        method: 'POST',
        body: JSON.stringify(todoData),
      });
      fetchTodos();
    } catch (err: any) {
      setError('Failed to create todo');
    }
  };

  const handleUpdate = async (todoData: TodoFormData) => {
    if (!editingTodo) return;
    try {
      await api(`/todos/${editingTodo._id}`, {
        method: 'PUT',
        body: JSON.stringify(todoData),
      });
      setEditingTodo(null);
      fetchTodos();
    } catch (err: any) {
      setError('Failed to update todo');
    }
  };

  const handleToggleStatus = async (todo: Todo) => {
    const newStatus = todo.status === 'Complete' ? 'Incomplete' : 'Complete';
    try {
      await api(`/todos/${todo._id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...todo, status: newStatus }),
      });
      fetchTodos();
    } catch (err: any) {
      setError('Failed to toggle status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api(`/todos/${id}`, { method: 'DELETE' });
        fetchTodos();
      } catch (err: any) {
        setError('Failed to delete todo');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-6 " style={{width:"100%"}}>
      <h2 className="text-3xl font-bold mb-8 text-indigo-600 text-center">My Tasks</h2>

      {/* Form Section */}
      {editingTodo ? (
        <TodoForm 
          onSubmit={handleUpdate} 
          initialData={editingTodo} 
          onCancel={() => setEditingTodo(null)} 
        />
      ) : (
        <TodoForm onSubmit={handleCreate} />
      )}

      {/* Controls Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex flex-wrap gap-4 items-end">
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
          <label className="block text-sm text-gray-600 mb-1 font-medium">Search Tasks</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-lg hover:bg-indigo-200 transition font-medium">
              Search
            </button>
          </div>
        </form>

        <div className="w-full sm:w-auto">
          <label className="block text-sm text-gray-600 mb-1 font-medium">Filter Status</label>
          <select 
            className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-sm text-gray-600 mb-1 font-medium">Sort By</label>
          <select 
            className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Default</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="status_asc">Status (A-Z)</option>
            <option value="status_desc">Status (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* List Section */}
      {loading ? (
        <div className="text-center py-10 text-gray-500 italic font-medium">Loading tasks...</div>
      ) : (
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center py-10 text-gray-400 font-medium">No tasks found. Add your first task!</p>
          ) : (
            todos.map(todo => (
              <TodoItem 
                key={todo._id} 
                todo={todo} 
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                onEdit={setEditingTodo}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
