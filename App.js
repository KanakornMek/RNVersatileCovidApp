import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navbar from './src/components/navbar';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNav from './src/screen/authscreen/components/authNav';

const AuthStack = createStackNavigator();

export default function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [logIn, setLogIn] = useState(false);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if(user) {
        setLogIn(true);
        setAuthLoading(false)
        console.log('user is logged in');
      }
    })
    return () => subscriber;
  })
  return (
    <>
      {!authLoading &&
        <NavigationContainer>

          <AuthStack.Navigator
            initialRouteName={logIn ? 'Navbar' : 'Auth'}
          >
            <AuthStack.Screen name="Auth" component={AuthNav} options={{ headerShown: false }} />
            <AuthStack.Screen name="Navbar" component={Navbar} options={{ headerShown: false }} />
          </AuthStack.Navigator>

        </NavigationContainer>
}
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
