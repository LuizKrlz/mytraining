import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const theme = useTheme();

  const handleSave = () => {
    console.log("Profile saved:", { height, age });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <Text
          variant="headlineLarge"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          Your Profile
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Height (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your height"
            right={<TextInput.Affix text="cm" />}
          />

          <TextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your age"
          />

          <Button mode="contained" onPress={handleSave} style={styles.button}>
            Save Profile
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    marginBottom: 32,
    fontWeight: "bold",
    alignSelf: "center",
  },
  form: {
    // max width for big screens, centered
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});
