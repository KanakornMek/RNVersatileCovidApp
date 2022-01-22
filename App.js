import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './src/components/navbar';

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNav from './src/screen/authscreen/components/authNav';
import auth from '@react-native-firebase/auth'
const AuthStack = createStackNavigator();
export const Loggedin = React.createContext();

export default function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [logIn, setLogIn] = useState(false);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setLogIn(true);
        console.log('user is logged in');
      }
      setAuthLoading(false)
    })
    return () => subscriber;
  }, [])
  return (
    <>
      {!authLoading &&
        <Loggedin.Provider value={logIn}>
          <NavigationContainer>

            <AuthStack.Navigator>
              {!logIn ? <AuthStack.Screen name="Auth" component={AuthNav} options={{ headerShown: false }} /> :
                <AuthStack.Screen name="Navbar" component={Navbar} options={{ headerShown: false }} />

              }
            </AuthStack.Navigator>

          </NavigationContainer>
        </Loggedin.Provider>
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
