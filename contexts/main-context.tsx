import { TCategory } from "@/types/category.types";
import { TExercise } from "@/types/exercise.types";
import { TWorkout } from "@/types/workout.types";
import React, { createContext, ReactNode, useContext, useState } from "react";

type MainContextType = {
  categories: TCategory[];
  setCategories: React.Dispatch<React.SetStateAction<TCategory[]>>;
  workouts: TWorkout[];
  setWorkouts: React.Dispatch<React.SetStateAction<TWorkout[]>>;
  exercises: TExercise[];
  setExercises: React.Dispatch<React.SetStateAction<TExercise[]>>;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [workouts, setWorkouts] = useState<TWorkout[]>([]);
  const [exercises, setExercises] = useState<TExercise[]>([]);

  return (
    <MainContext.Provider
      value={{
        categories,
        setCategories,
        workouts,
        setWorkouts,
        exercises,
        setExercises,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
