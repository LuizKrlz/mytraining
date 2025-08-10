import { useMainContext } from "@/contexts/main-context";

export function useWorkouts() {
  const { workouts } = useMainContext();

  return {
    data: workouts,
  };
}
