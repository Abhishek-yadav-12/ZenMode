import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [sessions, setSessions] = useState(4);

  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [currentSession, setCurrentSession] = useState(1);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (currentSession < sessions * 2) {
        setIsWorkSession(!isWorkSession);
        setTimeLeft(isWorkSession ? breakTime * 60 : workTime * 60);
        setCurrentSession((prev) => prev + 1);
        setIsActive(true); // Automatically start the next session
      } else {
        setCurrentSession(1);
        setIsWorkSession(true);
        setTimeLeft(workTime * 60);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isWorkSession, currentSession, sessions, workTime, breakTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsWorkSession(true);
    setCurrentSession(1);
    setTimeLeft(workTime * 60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zen Mode Timer</Text>

      <View style={styles.timerContainer}>
        <Text style={[styles.sessionText, isWorkSession ? styles.workText : styles.breakText]}>
          {isWorkSession ? 'Work Session' : 'Break Time'} - Session {Math.ceil(currentSession / 2)} / {sessions}
        </Text>

        <View style={styles.timerCircle}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Work (min)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={workTime.toString()}
            onChangeText={(val) => {
              const newVal = parseInt(val) || 1;
              setWorkTime(newVal);
              setTimeLeft(newVal * 60);
            }}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Break (min)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={breakTime.toString()}
            onChangeText={(val) => setBreakTime(parseInt(val) || 1)}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Sessions</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={sessions.toString()}
            onChangeText={(val) => setSessions(parseInt(val) || 1)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black theme
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  sessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#aaa',
    marginBottom: 10,
  },
  workText: {
    color: '#ddd',
  },
  breakText: {
    color: '#888',
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#555',
  },
  timerText: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  resetButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  inputBox: {
    alignItems: 'center',
    width: '30%',
  },
  label: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: 60,
    borderColor: '#555',
    borderWidth: 2,
  },
});

export default PomodoroTimer;
