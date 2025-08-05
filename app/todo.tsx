import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Card,
  IconButton,
  Text,
  Provider as PaperProvider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface Todo {
  id: string;
  title: string;
}

const STORAGE_KEY = '@smart_todo_list';

export default function TodoScreen() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos on change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const loadTodos = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setTodos(JSON.parse(data));
    } catch (e) {
      console.error('Error loading todos', e);
    }
  };

  const saveTodos = async (items: Todo[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving todos', e);
    }
  };

  const handleAddOrUpdate = () => {
    if (!task.trim()) return;

    if (editingId) {
      setTodos(prev =>
        prev.map(todo => (todo.id === editingId ? { ...todo, title: task } : todo))
      );
      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: uuid.v4().toString(),
        title: task,
      };
      setTodos(prev => [...prev, newTodo]);
    }

    setTask('');
  };

  const handleEdit = (todo: Todo) => {
    setTask(todo.title);
    setEditingId(todo.id);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTodos(prev => prev.filter(todo => todo.id !== id)),
      },
    ]);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          📝 Your Todo List
        </Text>

        <TextInput
          label="Enter a task"
          mode="outlined"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />

        <Button mode="contained" onPress={handleAddOrUpdate} style={styles.button}>
          {editingId ? 'Update Task' : 'Add Task'}
        </Button>

        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title
                title={item.title}
                right={() => (
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton icon="pencil" onPress={() => handleEdit(item)} />
                    <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
                  </View>
                )}
              />
            </Card>
          )}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
});
