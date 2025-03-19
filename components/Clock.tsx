import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, StatusBar } from "react-native";
import Orientation from "react-native-orientation-locker";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    Orientation.lockToLandscape();

    return () => {
      clearInterval(intervalId);
      Orientation.unlockAllOrientations();
    };
  }, []);

  // Ensure proper formatting and prevent errors
  const formattedTime =
    currentTime instanceof Date
      ? currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      : "00:00";

  const formattedDate =
    currentTime instanceof Date
      ? currentTime.toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })
      : "Unknown Date";

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.time}>{formattedTime}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  time: {
    fontSize: 150,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  date: {
    fontSize: 25,
    color: "gray",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Clock;
