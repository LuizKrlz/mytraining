import { CardExerciseItem } from "@/components/CardExerciseItem";
import { useExercises } from "@/hooks/use-exercises";
import { Link } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function ExercisesScreen() {
  const { data } = useExercises();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Exercicios" />
        <Link asChild href="/add-exercise">
          <Appbar.Action icon="plus" />
        </Link>
      </Appbar.Header>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href="/training-detail" asChild>
            <TouchableOpacity>
              <CardExerciseItem exercise={item} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
