import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Clock from './components/Clock';
import PomodoroTimer from './components/PomodoroTimer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Clock" component={Clock} />
        <Stack.Screen name="PomodoroTimer" component={PomodoroTimer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
