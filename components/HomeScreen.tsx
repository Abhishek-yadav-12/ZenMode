import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zen Mode</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Clock')}>
        <Text style={styles.buttonText}>Clock</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PomodoroTimer')}>
        <Text style={styles.buttonText}>Pomodoro Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 40,
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#E0E0E0',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
