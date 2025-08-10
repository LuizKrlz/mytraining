import { CardCategoryItem } from "@/components/CardCategoryItem";
import { useCategories } from "@/hooks/use-categories";
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function CategoriesScreen() {
  const { data } = useCategories();

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Categorias" />
        <Link href="/add-categories" asChild>
          <Appbar.Action icon="plus" />
        </Link>
      </Appbar.Header>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardCategoryItem category={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 24,
    alignSelf: "center",
    fontWeight: "bold",
  },
  listItem: {
    marginVertical: 4,
    borderRadius: 8,
  },
  titleStyle: {
    fontSize: 18,
  },
});
