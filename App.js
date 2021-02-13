import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Home';
import Profile from './components/Profile';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Login', gesturesEnabled: false }}
        />
        <Stack.Screen
          name="AccountHomePage"
          component={Profile}
          options={{ headerLeft: null }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default MyStack;