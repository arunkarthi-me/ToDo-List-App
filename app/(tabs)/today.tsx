import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Card, IconButton, Text, Provider } from 'react-native-paper';
import { useTodos } from '../../components/useTodos';

export default function TodayScreen() {
  const { todos, add, toggle, remove } = useTodos();
  const [task, setTask] = useState('');

  const todayTodos = todos;

  return (
    <Provider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.header}>Today</Text>
        <TextInput
          label="New task"
          value={task}
          onChangeText={setTask}
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={() => { add(task); setTask(''); }} style={styles.button}>
          Add Task
        </Button>

        <FlatList
          data={todayTodos}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title
                title={item.title}
                right={() => (
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton icon={item.completed ? "undo" : "check"} onPress={() => toggle(item.id)} />
                    <IconButton icon="delete" onPress={() => remove(item.id)} />
                  </View>
                )}
              />
            </Card>
          )}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { marginBottom: 10 },
  input: { marginBottom: 10 },
  button: { marginBottom: 20 },
  card: { marginBottom: 8 },
});
