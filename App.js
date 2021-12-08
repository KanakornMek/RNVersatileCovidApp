import React from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navbar from './src/components/navbar';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNav from './src/screen/authscreen/components/authNav';

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <>
      
        <NavigationContainer>

          <AuthStack.Navigator>
            <AuthStack.Screen name="Auth" component={AuthNav} />
            <AuthStack.Screen name="Navbar" component={Navbar} />
          </AuthStack.Navigator>

        </NavigationContainer>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
