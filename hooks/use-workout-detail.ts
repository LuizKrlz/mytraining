import { useMainContext } from "@/contexts/main-context";

export function useWorkoutDetail(id: string) {
  const { workouts } = useMainContext();
  //   const data: TWorkoutItem = {
  //     id: "1",
  //     name: "Treino de Força",
  //     description: "Treino focado em membros superiores para ganho de força.",
  //     categories: ["Peito", "Costas", "Braços"],
  //     excercises: [
  //       { id: "1", name: "Supino Reto", category: "Peito", completed: false },
  //       { id: "2", name: "Remada Curvada", category: "Costas", completed: false },
  //       { id: "3", name: "Rosca Direta", category: "Braços", completed: false },
  //       { id: "4", name: "Crucifixo", category: "Peito", completed: false },
  //       {
  //         id: "5",
  //         name: "Puxada na Barra",
  //         category: "Costas",
  //         completed: false,
  //       },
  //     ],
  //   };

  return {
    data: workouts.filter((item) => item.id === id),
  };
}
