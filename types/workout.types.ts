import { TExercise } from "./exercise.types";

export type TWorkout = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type TWorkoutItem = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  excercises: TExercise[];
};
