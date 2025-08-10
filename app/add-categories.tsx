import { useMainContext } from "@/contexts/main-context";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  HelperText,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { z } from "zod";

const schema = z.object({
  name: z.string({
    error: "O campo é obrigatório",
  }),
});

type TFormData = z.infer<typeof schema>;

export default function AddCategory() {
  const { setCategories, categories } = useMainContext();
  const router = useRouter();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { control, handleSubmit, reset } = useForm<TFormData>({
    resolver: zodResolver(schema),
  });

  const handleCancel = () => {
    reset();
    router.replace("/categories");
  };

  const onSubmit = handleSubmit(({ name }: TFormData) => {
    if (!categories.find((item) => item.name === name)) {
      setCategories([
        ...categories,
        {
          id: faker.string.uuid(),
          name,
        },
      ]);
      setSnackbarVisible(true);
    }
  });

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Adicionar" />
      </Appbar.Header>

      <Controller
        control={control}
        name="name"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              mode="outlined"
              label="Nome da categoria"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!error}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </>
        )}
      />

      <Button mode="contained" onPress={onSubmit}>
        Salvar
      </Button>

      <Button mode="outlined" onPress={handleCancel}>
        Cancelar
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: "Fechar",
          onPress: () => {
            setSnackbarVisible(false);
            reset();
            router.replace("/categories");
          },
        }}
      >
        Categoria salva com sucesso!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 4,
  },
});
