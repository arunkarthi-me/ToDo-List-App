import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Provider, Text } from 'react-native-paper';
import { useTodos } from '../../components/useTodos';

export default function AddScreen() {
  const { add } = useTodos();
  const [title, setTitle] = useState('');

  return (
    <Provider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.header}>Add Task</Text>
        <TextInput
          label="Task title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" disabled={!title.trim()} onPress={() => { add(title.trim()); setTitle(''); }}>
          Add
        </Button>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 10 },
});
