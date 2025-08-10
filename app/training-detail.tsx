import { useWorkoutDetail } from "@/hooks/use-workout-detail";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutDetailScreen() {
  const { data } = useWorkoutDetail("1");
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [trainingCompleted, setTrainingCompleted] = useState(false);
  const [exercises, setExercises] = useState(data.excercises);
  const toggleExerciseCompleted = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    );
  };

  const toggleTrainingCompleted = () => {
    setTrainingCompleted((prev) => !prev);
  };

  const filteredExercises = selectedCategory
    ? exercises.filter((ex) => ex.category === selectedCategory)
    : exercises;

  const totalExercisesCompleted = exercises.filter(
    (item) => !item.completed
  ).length;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Título e descrição */}
      <Text variant="headlineLarge" style={styles.title}>
        {data.name}
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        {data.description}
      </Text>

      {/* Filtro de categorias */}
      <View style={styles.chipContainer}>
        <Chip
          selected={!selectedCategory}
          onPress={() => setSelectedCategory(null)}
          style={styles.chip}
        >
          Todas
        </Chip>
        {data.categories.map((cat) => (
          <Chip
            key={cat}
            selected={selectedCategory === cat}
            onPress={() => setSelectedCategory(cat)}
            style={styles.chip}
          >
            {cat}
          </Chip>
        ))}
      </View>

      {/* Lista de exercícios */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.category}
            left={(props) => (
              <List.Icon
                {...props}
                icon={item.completed ? "check-circle" : "circle-outline"}
                color={item.completed ? theme.colors.primary : undefined}
              />
            )}
            right={() => (
              <IconButton
                icon={item.completed ? "close" : "check"}
                onPress={() => toggleExerciseCompleted(item.id)}
                iconColor={
                  item.completed ? theme.colors.error : theme.colors.primary
                }
              />
            )}
          />
        )}
        style={styles.list}
      />

      <Button
        mode={trainingCompleted ? "outlined" : "contained"}
        onPress={toggleTrainingCompleted}
        style={styles.trainingButton}
      >
        {trainingCompleted
          ? "Treino concluído hoje"
          : totalExercisesCompleted > 0
          ? `Faltam para concluir: ${totalExercisesCompleted}`
          : "Concluir treino"}
      </Button>
      <Link href=".." asChild>
        <Button
          style={{
            marginTop: 16,
          }}
        >
          Voltar
        </Button>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  trainingButton: {
    marginTop: 16,
  },
});
