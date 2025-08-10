import { TExercise } from "@/types/exercise.types";
import { faker } from "@faker-js/faker";

export function useExercises() {
  const data: TExercise[] = Array.from({ length: 6 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    category: faker.helpers.arrayElement([
      "chest",
      "back",
      "legs",
      "arms",
      "shoulders",
    ]),
    description: faker.lorem.sentence(),
    difficulty: faker.helpers.arrayElement([
      "beginner",
      "intermediate",
      "advanced",
    ]),
    equipment: faker.helpers.arrayElement([
      "barbell",
      "dumbbell",
      "bodyweight",
      "machine",
    ]),
    sets: faker.number.int({ min: 3, max: 5 }),
    reps: faker.number.int({ min: 8, max: 15 }),
  }));

  return {
    data,
  };
}
