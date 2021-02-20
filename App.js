import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Home';
import Profile from './components/Profile';
import Header from './components/Header';
import userReducer from './redux/reducers/user';

const Stack = createStackNavigator();
const store = createStore(userReducer);

const MyStack = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Login', gesturesEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="AccountHomePage"
            component={Profile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};



export default MyStack;