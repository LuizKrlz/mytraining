import { useMainContext } from "@/contexts/main-context";

export function useCategories() {
  const { categories } = useMainContext();

  return {
    data: categories,
  };
}
