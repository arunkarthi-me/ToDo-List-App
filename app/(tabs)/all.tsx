import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, IconButton, Text, Provider } from 'react-native-paper';
import { useTodos } from '../../components/useTodos';

export default function AllScreen() {
  const { todos, toggle, remove } = useTodos();

  return (
    <Provider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.header}>All Tasks</Text>
        <FlatList
          data={todos}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title
                title={item.title}
                left={() => <IconButton icon={item.completed ? "check-circle" : "circle-outline"} onPress={() => toggle(item.id)} />}
                right={() => <IconButton icon="delete" onPress={() => remove(item.id)} />}
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
