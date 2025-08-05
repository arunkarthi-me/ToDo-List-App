// reusable hook for CRUD + AsyncStorage
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const STORAGE_KEY = '@smart_todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then(d => d && setTodos(JSON.parse(d))); }, []);
  useEffect(() => { AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); }, [todos]);

  const add = (title: string) =>
    setTodos(prev => [...prev, { id: uuid.v4().toString(), title, completed: false }]);

  const toggle = (id: string) =>
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const remove = (id: string) =>
    setTodos(prev => prev.filter(t => t.id !== id));

  return { todos, add, toggle, remove };
}
