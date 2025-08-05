import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, IconButton, Text, Provider } from 'react-native-paper';
import { useTodos } from '../../components/useTodos';

export default function CompletedScreen() {
  const { todos, toggle, remove } = useTodos();
  const completed = todos.filter(t => t.completed);

  return (
    <Provider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.header}>Completed</Text>
        <FlatList
          data={completed}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title
                title={item.title}
                right={() => (
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton icon="undo" onPress={() => toggle(item.id)} />
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
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 10 },
  card: { marginBottom: 8 },
});
