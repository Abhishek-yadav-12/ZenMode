import React from "react";
import { 
  ImageBackground,
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../src/bg.jpg")}
      style={styles.background} // ✅ Fix: Ensure the image covers the full screen
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Zen Mode</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("Clock")}
        >
          <Text style={styles.buttonText}>Clock</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("PomodoroTimer")}
        >
          <Text style={styles.buttonText}>Pomodoro Timer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // ✅ Fix: Ensure the background covers the full screen
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#F4EDE3",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "rgba(44, 44, 44, 0.8)", // ✅ Fix: Slight transparency for better blending
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF9800",
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 22,
    color: "#A9A9A9",
    fontWeight: "bold",
    fontFamily: "System", // ✅ Fix: More cross-platform compatibility
  },
});

export default HomeScreen;
