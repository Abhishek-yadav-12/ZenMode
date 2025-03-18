import React from "react";
import { View, StyleSheet } from "react-native";
import Clock from "./components/Clock";
import { createStackNavigator, StackView } from "@react-navigation/stack";


const App = () => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "black",
  },
});

export default App;
