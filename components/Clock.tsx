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

  // Ensure proper formatting
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.time}>
        <Text style={styles.timeMain}>{hours}:{minutes}</Text>
        <Text style={styles.timeSeconds}>:{seconds}</Text>
      </Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1C", // Darker shade for vintage screen effect
  },
  time: {
    fontSize: 150,
    fontWeight: "bold",
    color: "#F4EDE3", // Slightly warm off-white for vintage effect
    textAlign: "center",
    fontFamily: "monospace",
  },
  timeMain: {
    color: "#F4EDE3", // Main time remains off-white
  },
  timeSeconds: {
    color: "#FF9800", // Retro orange tint for seconds
  },
  date: {
    fontSize: 25,
    color: "#A9A9A9", // Muted gray for a soft vintage look
    marginTop: 10,
    textAlign: "center",
    fontFamily: "monospace",
  },
});

export default Clock;
