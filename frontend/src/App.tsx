import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TodoList from './components/Todos/TodoList';

function AppContent() {
  const { user, logout, loading } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-indigo-600 font-semibold text-xl">Loading...</div>;
  }

  if (!user) {
    return isRegister ? (
      <Register onSwitch={() => setIsRegister(false)} />
    ) : (
      <Login onSwitch={() => setIsRegister(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold tracking-tight">Antigravity ToDo</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium bg-indigo-500 px-3 py-1 rounded-full text-sm">Welcome, {user.username}!</span>
          <button
            onClick={logout}
            className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow py-8 px-4 overflow-y-auto">
        <TodoList />
      </main>
      <footer className="p-4 bg-white border-t text-center text-gray-500 text-sm">
        &copy; 2026 Antigravity ToDo App. All rights reserved.
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
