import React from 'react'
import { View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../loginAuth';
import SignUp from '../signUpAuth';

export default function AuthNav() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}

