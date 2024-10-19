import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import StudentDashboard from './components/StudentDashboard';
import ExamDetails from './components/ExamDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="ExamDetails" component={ExamDetails} options={{ title: 'Exam Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}