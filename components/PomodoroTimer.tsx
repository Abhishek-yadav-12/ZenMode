import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PomodoroTimer = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    let interval: any;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsSession(!isSession);
      setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60);
      setIsActive(true);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isSession, sessionLength, breakLength]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerBox}>
        <Text style={styles.sessionLabel}>SESSION</Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.controlButton} onPress={() => setIsActive(!isActive)}>
            <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => {
            setIsActive(false);
            setTimeLeft(sessionLength * 60);
            setIsSession(true);
          }}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lengthControls}>
        <View style={styles.lengthBox}>
          <Text style={styles.lengthLabel}>Break Length</Text>
          <View style={styles.lengthControlRow}>
            <TouchableOpacity onPress={() => setBreakLength((prev) => Math.max(prev - 1, 1))} style={styles.lengthButton}>
              <Text style={styles.lengthButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.lengthValue}>{breakLength}</Text>
            <TouchableOpacity onPress={() => setBreakLength((prev) => prev + 1)} style={styles.lengthButton}>
              <Text style={styles.lengthButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lengthBox}>
          <Text style={styles.lengthLabel}>Session Length</Text>
          <View style={styles.lengthControlRow}>
            <TouchableOpacity onPress={() => setSessionLength((prev) => Math.max(prev - 1, 1))} style={styles.lengthButton}>
              <Text style={styles.lengthButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.lengthValue}>{sessionLength}</Text>
            <TouchableOpacity onPress={() => setSessionLength((prev) => prev + 1)} style={styles.lengthButton}>
              <Text style={styles.lengthButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B56E66', // Soft vintage red background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  timerBox: {
    backgroundColor: '#D8D8D8', // Light gray box
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sessionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  timer: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 5,
    shadowOpacity: 0.1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  lengthControls: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '80%',
  },
  lengthBox: {
    alignItems: 'center',
    backgroundColor: '#B0C4B1', // Greenish tint
    padding: 15,
    borderRadius: 10,
    width: '45%',
  },
  lengthLabel: {
    fontSize: 12,
    color: '#222',
    marginBottom: 8,
  },
  lengthControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lengthButton: {
    backgroundColor: '#A6A6A6',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  lengthButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  lengthValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default PomodoroTimer;
