import React from "react";
import { View, StyleSheet } from "react-native";
import Clock from "./components/Clock";

const App = () => {
  return (
    <View style={styles.container}>
      <Clock />
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
