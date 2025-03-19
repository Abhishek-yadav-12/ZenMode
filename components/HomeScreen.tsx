import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zen Mode</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Clock")}>
        <Text style={styles.buttonText}>Clock</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PomodoroTimer")}>
        <Text style={styles.buttonText}>Pomodoro Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C", // Matching the clock's background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F4EDE3", // Warm off-white
    marginBottom: 40,
    textTransform: "uppercase",
    fontFamily: "monospace",
  },
  button: {
    backgroundColor: "#2C2C2C", // Darker gray to match the clock’s subtle tones
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF9800", // Orange outline to match clock's seconds color
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#A9A9A9", // Muted gray for a softer effect
    fontWeight: "bold",
    fontFamily: "monospace",
  },
});

export default HomeScreen;
