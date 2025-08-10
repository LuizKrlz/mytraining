import { TWorkout } from "@/types/workout.types";
import { Avatar, Card, IconButton } from "react-native-paper";

export function CardWorkoutItem({ workout }: { workout: TWorkout }) {
  return (
    <Card style={{ marginBottom: 12 }} mode="contained">
      <Card.Title
        title={workout.name}
        subtitle={workout.description}
        left={(props) => (
          <Avatar.Image {...props} size={48} source={{ uri: workout.image }} />
        )}
        right={(props) => <IconButton {...props} icon="chevron-right" />}
      />
    </Card>
  );
}
