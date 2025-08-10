import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Divider,
  IconButton,
  List,
  Menu,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Exercise = {
  id: string;
  name: string;
  category: string;
};

type WorkoutForm = {
  name: string;
  description: string;
  exercises: Exercise[];
};

const ALL_EXERCISES: Exercise[] = [
  { id: "1", name: "Bench Press", category: "chest" },
  { id: "2", name: "Push-up", category: "chest" },
  { id: "3", name: "Pull-up", category: "back" },
  { id: "4", name: "Deadlift", category: "back" },
  { id: "5", name: "Squat", category: "legs" },
  { id: "6", name: "Leg Press", category: "legs" },
];

const CATEGORIES = [
  { value: "chest", label: "Chest" },
  { value: "back", label: "Back" },
  { value: "shoulders", label: "Shoulders" },
  { value: "arms", label: "Arms" },
  { value: "legs", label: "Legs" },
  { value: "core", label: "Core" },
];

export default function CreateWorkoutScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { control, handleSubmit, reset } = useForm<WorkoutForm>({
    defaultValues: {
      name: "",
      description: "",
      exercises: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredExercises = useMemo(() => {
    if (!selectedCategory) return [];
    return ALL_EXERCISES.filter((ex) => ex.category === selectedCategory);
  }, [selectedCategory]);

  function addExercise(exercise: Exercise) {
    if (fields.find((f) => f.id === exercise.id)) return;
    append(exercise);
  }

  function onSubmit(data: WorkoutForm) {
    console.log("Workout saved:", data);
  }

  function handleCancel() {
    reset();
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView style={styles.flex}>
        <View style={styles.content}>
          <Text variant="headlineLarge" style={styles.title}>
            Create Workout
          </Text>

          {/* Nome */}
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                label="Workout Name"
                mode="outlined"
                value={value}
                onChangeText={onChange}
                style={styles.input}
                error={!!error}
              />
            )}
          />

          {/* Descrição */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Description"
                mode="outlined"
                multiline
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />

          {/* Dropdown categoria */}
          <View style={{ marginBottom: 16 }}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setMenuVisible(true)}
                  style={{ justifyContent: "space-between" }}
                  contentStyle={{ flexDirection: "row-reverse" }}
                >
                  {selectedCategory
                    ? CATEGORIES.find((c) => c.value === selectedCategory)
                        ?.label
                    : "Select Exercise Category"}
                </Button>
              }
            >
              {CATEGORIES.map((cat) => (
                <Menu.Item
                  key={cat.value}
                  onPress={() => {
                    setSelectedCategory(cat.value);
                    setMenuVisible(false);
                  }}
                  title={cat.label}
                />
              ))}
            </Menu>
          </View>

          {/* Lista de exercícios filtrados */}
          <Text variant="titleMedium">Exercises to Add</Text>

          <FlatList
            data={filteredExercises}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 200, marginBottom: 16, minHeight: 30 }}
            ListEmptyComponent={() => (
              <Text>No exercises found for this category.</Text>
            )}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                description={item.category}
                right={() => (
                  <IconButton
                    icon="plus-circle-outline"
                    onPress={() => addExercise(item)}
                    disabled={fields.some((f) => f.id === item.id)}
                  />
                )}
              />
            )}
            ItemSeparatorComponent={() => <Divider />}
          />

          {/* Exercícios adicionados */}
          <Text variant="titleMedium">Added Exercises</Text>
          <FlatList
            data={fields}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 200, marginBottom: 16 }}
            ListEmptyComponent={() => (
              <Text variant="bodyLarge">No exercises added yet.</Text>
            )}
            renderItem={({ item, index }) => (
              <List.Item
                title={item.name}
                description={item.category}
                right={() => (
                  <IconButton
                    icon="delete-outline"
                    onPress={() => remove(index)}
                    color={theme.colors.error}
                  />
                )}
              />
            )}
            ItemSeparatorComponent={() => <Divider />}
          />
        </View>
      </SafeAreaView>
      {/* Botão fixo */}
      <Surface
        elevation={4}
        style={[styles.footer, { paddingBlock: insets.bottom }]}
      >
        <Button
          style={styles.commonButton}
          mode="outlined"
          onPress={handleCancel}
        >
          Cancel
        </Button>
        <Button
          style={styles.commonButton}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Save Workout
        </Button>
      </Surface>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flex: 1, padding: 16 },
  title: { marginBottom: 12 },
  input: { marginBottom: 12 },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 16,
    justifyContent: "center",
    gap: 14,
    flexDirection: "row",
    paddingTop: 20,
  },
  commonButton: {
    flex: 1,
  },
});
