import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';

import AntDesign from 'react-native-vector-icons/AntDesign';

import MainReserve from './mainreservation';
import ReserveOpt from './reserveoptions';
import Room from './chooseRoom';
import Form from './formreserve';

const Stack = createStackNavigator();

export default function ReserveNav(){
    return(
        <Stack.Navigator 
          initialRouteName="Reserve Main"
          >
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
                  presentation: 'modal',
                  ...TransitionPresets.SlideFromRightIOS,
                    headerStyle:{
                        height: 60,
                    },
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return (
                          <View style={[options.headerStyle,{
                            borderBottomColor: '#b1b1b1',
                            borderBottomWidth: 2,
                            alignItems:'center',
                            flexDirection: 'row',
                            }]}>
                              <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign 
                                    name='arrowleft' 
                                    size={options.headerStyle.height*0.6} 
                                    style={{marginLeft: 10}}
                                />
                              </TouchableOpacity>
                              <Text style={{fontSize: 20, marginLeft: 20}} >{title}</Text>
                          </View>
                        );
                      },
                }}
            />
            <Stack.Screen 
                name="chooseRoom" 
                component={Room} 
                options={{
                  presentation: 'modal',
                  ...TransitionPresets.SlideFromRightIOS,
                    headerStyle:{
                        height: 60,
                    },
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return (
                          <View style={[options.headerStyle,{
                            borderBottomColor: '#b1b1b1',
                            borderBottomWidth: 2,
                            alignItems:'center',
                            flexDirection: 'row',
                            }]}>
                              <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign 
                                    name='arrowleft' 
                                    size={options.headerStyle.height*0.6} 
                                    style={{marginLeft: 10}}
                                />
                              </TouchableOpacity>
                              <Text style={{fontSize: 20, marginLeft: 20}} >{title}</Text>
                          </View>
                        );
                      },
                }}
            />
            <Stack.Screen 
                name="ReserveForm" 
                component={Form} 
                options={{
                  presentation: 'modal',
                  ...TransitionPresets.SlideFromRightIOS,
                    headerStyle:{
                        height: 60,
                    },
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return (
                          <View style={[options.headerStyle,{
                            borderBottomColor: '#b1b1b1',
                            borderBottomWidth: 2,
                            alignItems:'center',
                            flexDirection: 'row',
                            }]}>
                              <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign 
                                    name='arrowleft' 
                                    size={options.headerStyle.height*0.6} 
                                    style={{marginLeft: 10}}
                                />
                              </TouchableOpacity>
                              <Text style={{fontSize: 20, marginLeft: 20}} >{title}</Text>
                          </View>
                        );
                      },
                }}
            />

        </Stack.Navigator>
    );
}