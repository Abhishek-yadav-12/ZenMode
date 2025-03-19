import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const PomodoroTimer = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionCount, setSessionCount] = useState(4);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setTimeout(() => {
        if (isSession) {
          setCompletedSessions(prev => prev + 1);
        }

        if (completedSessions + 1 >= sessionCount) {
          setShowMessage(true);
        } else {
          setIsSession(!isSession);
          setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60);
          setIsActive(true);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    isActive,
    timeLeft,
    isSession,
    sessionLength,
    breakLength,
    completedSessions,
    sessionCount,
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerCircle}>
        <Text style={styles.sessionLabel}>
          {isSession ? 'SESSION' : 'BREAK'}
        </Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsActive(!isActive)}>
          <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            setIsActive(false);
            setTimeLeft(sessionLength * 60);
            setIsSession(true);
            setCompletedSessions(0);
            setShowMessage(false);
          }}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Timer Controls */}
      <View style={styles.lengthControls}>
        {/* Break Length Control */}
        <View style={styles.lengthBox}>
          <Text style={styles.lengthLabel}>Break Length</Text>
          <View style={styles.lengthControlRow}>
            <TouchableOpacity
              onPress={() => setBreakLength(prev => Math.max(prev - 1, 1))}
              style={styles.lengthButton}>
              <Text style={styles.lengthButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.lengthInput}
              keyboardType="numeric"
              value={breakLength.toString()}
              onChangeText={text => {
                const num = parseInt(text) || 1;
                setBreakLength(num);
              }}
            />
            <TouchableOpacity
              onPress={() => setBreakLength(prev => prev + 1)}
              style={styles.lengthButton}>
              <Text style={styles.lengthButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Session Length Control */}
        <View style={styles.lengthBox}>
          <Text style={styles.lengthLabel}>Session Length</Text>
          <View style={styles.lengthControlRow}>
            <TouchableOpacity
              onPress={() => setSessionLength(prev => Math.max(prev - 1, 1))}
              style={styles.lengthButton}>
              <Text style={styles.lengthButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.lengthInput}
              keyboardType="numeric"
              value={sessionLength.toString()}
              onChangeText={text => {
                const num = parseInt(text) || 1;
                setSessionLength(num);
                if (!isActive) setTimeLeft(num * 60);
              }}
            />
            <TouchableOpacity
              onPress={() => setSessionLength(prev => prev + 1)}
              style={styles.lengthButton}>
              <Text style={styles.lengthButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Number of Sessions Control (with buttons only) */}
      <View style={styles.lengthBox}>
        <Text style={styles.lengthLabel}>Number of Sessions</Text>
        <View style={styles.lengthControlRow}>
          <TouchableOpacity
            onPress={() => setSessionCount(prev => Math.max(prev - 1, 1))}
            style={styles.lengthButton}>
            <Text style={styles.lengthButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.sessionCountText}>{sessionCount}</Text>
          <TouchableOpacity
            onPress={() => setSessionCount(prev => prev + 1)}
            style={styles.lengthButton}>
            <Text style={styles.lengthButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.completedSessions}>
        Completed Sessions: {completedSessions} / {sessionCount}
      </Text>

      {/* Congratulatory Message */}
      {showMessage && (
        <Text style={styles.finalMessage}>
          🎉 Congratulations! You stuck to the end. Great job! 🎉
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C1C1C',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
  
    timerCircle: {
      width: 220,
      height: 220,
      borderRadius: 110,
      borderWidth: 6,
      borderColor: '#FF9800',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2C2C2C',
      marginBottom: 20,
    },
  
    sessionLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#F4EDE3',
      marginBottom: 5,
    },
  
    timer: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#FF9800',
    },
  
    buttonRow: {
      flexDirection: 'row',
      marginVertical: 15,
    },
  
    controlButton: {
      backgroundColor: '#333333',
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginHorizontal: 8,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#FF9800',
    },
  
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#F4EDE3',
    },
  
    lengthControls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 15,
    },
  
    lengthBox: {
      alignItems: 'center',
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#333333',
      width: '45%',
    },
  
    lengthLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#F4EDE3',
      marginBottom: 8,
    },
  
    lengthControlRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    lengthButton: {
      backgroundColor: '#444',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: '#FF9800',
    },
  
    lengthButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#F4EDE3',
    },
  
    lengthInput: {
      backgroundColor: '#222',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FF9800',
      width: 50,
      paddingVertical: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#FF9800',
    },
  
    sessionCountText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#F4EDE3',
      marginHorizontal: 12,
    },
  
    completedSessions: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF9800',
      marginTop: 15,
    },
  
    finalMessage: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FF9800',
      textAlign: 'center',
    },
  });

  export default PomodoroTimer;