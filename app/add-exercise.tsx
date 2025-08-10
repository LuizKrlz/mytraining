import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  HelperText,
  Menu,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type ExerciseFormData = {
  name: string;
  category: string;
  sets: number;
  reps: number;
};

const categories = [
  { label: "Peito", value: "chest" },
  { label: "Costas", value: "back" },
  { label: "Pernas", value: "legs" },
  { label: "Ombros", value: "shoulders" },
  { label: "Braços", value: "arms" },
  { label: "Abdômen", value: "abs" },
];

export default function CreateExerciseScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    defaultValues: { sets: 3, reps: 10 },
  });
  const [menuVisible, setMenuVisible] = useState(false);

  const onSubmit = (data: ExerciseFormData) => {
    console.log("Novo exercício:", data);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text variant="headlineSmall" style={styles.title}>
            Criar Exercício
          </Text>

          {/* Nome */}
          <Controller
            control={control}
            name="name"
            rules={{ required: "Informe o nome do exercício" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Nome"
                  value={value}
                  onChangeText={onChange}
                />
                <HelperText type="error" visible={!!errors.name}>
                  {errors.name?.message}
                </HelperText>
              </>
            )}
          />

          {/* Categoria */}
          <Controller
            control={control}
            name="category"
            rules={{ required: "Selecione a categoria" }}
            render={({ field: { onChange, value } }) => (
              <>
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <TouchableOpacity
                      onPress={() => setMenuVisible(true)}
                      style={[
                        { borderColor: theme.colors.outline },
                        styles.anchor,
                      ]}
                    >
                      <Text>
                        {categories.find((c) => c.value === value)?.label ||
                          "Selecionar categoria"}
                      </Text>
                      <MaterialCommunityIcons
                        name="chevron-down"
                        size={20}
                        color={theme.colors.onSurface}
                      />
                    </TouchableOpacity>
                  }
                >
                  {categories.map((c) => (
                    <Menu.Item
                      key={c.value}
                      onPress={() => {
                        onChange(c.value);
                        setMenuVisible(false);
                      }}
                      title={c.label}
                    />
                  ))}
                </Menu>

                <HelperText type="error" visible={!!errors.category}>
                  {errors.category?.message}
                </HelperText>
              </>
            )}
          />

          {/* Séries */}
          <Controller
            control={control}
            name="sets"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.sliderBlock}>
                <Text variant="titleMedium">Séries: {value}</Text>
                <Slider
                  style={{ width: "100%" }}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={value}
                  onValueChange={onChange}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor={theme.colors.onSurfaceVariant}
                  thumbTintColor={theme.colors.primary}
                />
              </View>
            )}
          />

          {/* Repetições */}
          <Controller
            control={control}
            name="reps"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.sliderBlock}>
                <Text variant="titleMedium">Repetições: {value}</Text>
                <Slider
                  style={{ width: "100%" }}
                  minimumValue={1}
                  maximumValue={30}
                  step={1}
                  value={value}
                  onValueChange={onChange}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor={theme.colors.onSurfaceVariant}
                  thumbTintColor={theme.colors.primary}
                />
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>

      <Surface
        elevation={4}
        style={[styles.footer, { paddingBlock: insets.bottom }]}
      >
        <Button
          style={styles.commonButton}
          mode="outlined"
          onPress={handleCancel}
        >
          Cancel
        </Button>
        <Button
          style={styles.commonButton}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  title: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  sliderBlock: {
    marginVertical: 16,
  },
  footer: {
    paddingHorizontal: 16,
    justifyContent: "center",
    gap: 14,
    flexDirection: "row",
    paddingTop: 20,
  },
  commonButton: {
    flex: 1,
  },
  anchor: {
    borderWidth: 1,

    borderRadius: 4,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
