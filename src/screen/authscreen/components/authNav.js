import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../loginAuth';
import SignupNav from './signupNav';

export default function AuthNav() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUpNav" component={SignupNav} />
        </Stack.Navigator>
    )
}

