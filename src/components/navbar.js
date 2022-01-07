import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainReserve from '../screen/reservationscreen/mainreservation';
import ReserveOpt from '../screen/reservationscreen/stacks/reservebed/reserveoptions';
import Room from '../screen/reservationscreen/stacks/reservebed/chooseRoom';
import Form from '../screen/reservationscreen/stacks/reservebed/formreserve';
import AddDocuments from '../screen/reservationscreen/stacks/reservebed/addDocuments';

import Home from '../screen/mainscreen/main';
import Reservation from '../screen/reservationscreen/mainreservation';
import OtherFunc from '../screen/otherfunctionscreen/maino.function';
import AccountNav from '../screen/accountscreen/components/accountNav';
import Chatbot from '../screen/otherfunctionscreen/stacks/chatbot';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export const AuthContext = React.createContext();
export default function Navbar({ navigation }) {
    const [authInfo, setAuthInfo] = React.useState({});

    useEffect(() => {
        const subscriber = firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(doc => {
            setAuthInfo(doc.data());
        });
        return () => subscriber();
    }, []);
    return (
        <AuthContext.Provider value={authInfo}>
            {!auth().currentUser && navigation.navigate('Auth')}
            <Stack.Navigator
                initialRouteName="tab"
            >
                <Stack.Screen
                    name='tab'
                    component={TabNavComponent}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Reserve Main"
                    component={MainReserve}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="chooseHospital"
                    component={ReserveOpt}
                    options={{
                        ...TransitionPresets.SlideFromRightIOS,
                        headerStyle: {
                            height: 60,
                        },
                        header: ({ navigation, route, options, back }) => {
                            const title = getHeaderTitle(options, route.name);
                            return (
                                <View style={[options.headerStyle, {
                                    borderBottomColor: '#b1b1b1',
                                    borderBottomWidth: 2,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }]}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <AntDesign
                                            name='arrowleft'
                                            size={options.headerStyle.height * 0.6}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, marginLeft: 20 }} >{title}</Text>
                                </View>
                            );
                        },
                    }}
                />
                <Stack.Screen
                    name="chooseRoom"
                    component={Room}
                    options={{
                        ...TransitionPresets.SlideFromRightIOS,
                        headerStyle: {
                            height: 60,
                        },
                        header: ({ navigation, route, options, back }) => {
                            const title = getHeaderTitle(options, route.name);
                            return (
                                <View style={[options.headerStyle, {
                                    borderBottomColor: '#b1b1b1',
                                    borderBottomWidth: 2,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }]}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <AntDesign
                                            name='arrowleft'
                                            size={options.headerStyle.height * 0.6}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, marginLeft: 20 }} >{title}</Text>
                                </View>
                            );
                        },
                    }}
                />
                <Stack.Screen
                    name="ReserveForm"
                    component={Form}
                    options={{
                        headerStyle: {
                            height: 60,
                        },
                        header: ({ navigation, route, options, back }) => {
                            const title = getHeaderTitle(options, route.name);
                            return (
                                <View style={[options.headerStyle, {
                                    borderBottomColor: '#b1b1b1',
                                    borderBottomWidth: 2,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }]}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <AntDesign
                                            name='arrowleft'
                                            size={options.headerStyle.height * 0.6}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, marginLeft: 20 }} >{title}</Text>
                                </View>
                            );
                        },
                    }}
                />
                <Stack.Screen
                    name="AddDocuments"
                    component={AddDocuments}

                />
                <Stack.Screen 

                    name="Chatbot"
                    component={Chatbot}
                    options={{
                        ...TransitionPresets.SlideFromRightIOS,
                        headerStyle: {
                            backgroundColor: '#242424',
                        },
                        headerTitleStyle: {
                            color: 'white',
                        },
                        headerTintColor: 'white'
                    }}
                />
            </Stack.Navigator>
                
        </AuthContext.Provider>
    );
}


function TabNavComponent() {
    return (
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
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Reservation' component={Reservation} />
            <Tab.Screen name='Chatbot' component={OtherFunc} />
            <Tab.Screen name='Account' options={{ headerStyle: { height: 33, backgroundColor: '#15ABFF' } }} component={AccountNav} />
        </Tab.Navigator>
    );
}