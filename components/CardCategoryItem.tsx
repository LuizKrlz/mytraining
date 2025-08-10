import { TCategory } from "@/types/category.types";
import { Link } from "expo-router";
import { Card, IconButton } from "react-native-paper";

export function CardCategoryItem({ category }: { category: TCategory }) {
  return (
    <Card style={{ marginBottom: 12 }} mode="contained">
      <Card.Title
        title={category.name}
        right={(props) => (
          <Link href="/add-categories" asChild>
            <IconButton {...props} icon="chevron-right" />
          </Link>
        )}
      />
    </Card>
  );
}
