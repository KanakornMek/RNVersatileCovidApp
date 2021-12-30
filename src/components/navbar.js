import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Home from '../screen/mainscreen/main';
import Reservation from '../screen/reservationscreen/reservationNav';
import Chatbot from '../screen/otherfunctionscreen/maino.function';
import Account from '../screen/accountscreen/account';
import AccountNav from '../screen/accountscreen/components/accountNav';

const Tab = createBottomTabNavigator();

export const AuthContext = React.createContext();
export default function Navbar({navigation}) {
    const [authInfo, setAuthInfo] = React.useState({});
    
    useEffect(() => {
        const subscriber =firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(doc => {
            setAuthInfo(doc.data());
        });
        return () => subscriber();
    }, []);
    return (
        <AuthContext.Provider value={authInfo}>
        {!auth().currentUser && navigation.navigate('Auth')}
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Reservation') {
                        iconName = 'hospital-o';
                        return <FontAwesome name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Chatbot') {
                        iconName = 'robot';
                        return <FontAwesome5 name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Account') {
                        iconName = 'account-outline'
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }   
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarHideOnKeyboard: true,
                headerStyle: {
                    backgroundColor: '#15ABFF',
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    height: 33,
                },
                headerTitle: '',
                lazy: true,
            })}
        >
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Reservation' component={Reservation} />
            <Tab.Screen name='Chatbot' component={Chatbot}/>
            <Tab.Screen name='Account' options={{headerStyle: {height: 33, backgroundColor:'#15ABFF'}}} component={AccountNav} />
        </Tab.Navigator>
        </AuthContext.Provider>
    );
}
