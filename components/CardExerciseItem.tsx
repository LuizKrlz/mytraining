import { TExercise } from "@/types/exercise.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Avatar, Card, Text, useTheme } from "react-native-paper";

export function CardExerciseItem({
  exercise: { name, sets, reps, category },
}: {
  exercise: TExercise;
}) {
  const theme = useTheme();
  return (
    <Card mode="elevated" style={{ marginVertical: 4 }}>
      <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Icon size={48} icon="dumbbell" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium">{name}</Text>
          <Text variant="bodyMedium">
            {sets} séries • {reps} repetições
          </Text>
          <Text
            variant="bodySmall"
            style={{
              color: theme.colors.secondary,
              textTransform: "uppercase",
            }}
          >
            {category}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={theme.colors.secondary}
        />
      </Card.Content>
    </Card>
  );
}
