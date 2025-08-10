import { CardWorkoutItem } from "@/components/CardWorkoutItem";
import { useWorkouts } from "@/hooks/use-workouts";
import { Link } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function WorkoutListScreen() {
  const { data } = useWorkouts();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Workouts" />
        <Link asChild href="/add-workout">
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
              <CardWorkoutItem workout={item} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
