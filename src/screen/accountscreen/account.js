import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import auth from '@react-native-firebase/auth';

export default function Account({navigation}) {

    function handleLogout() {
        auth().signOut();
        navigation.navigate('Auth');
    }

    return (
        <View style={styles.container}>
            <View style={styles.top_box}>
                <View style={styles.wrapper}>
                    <View style={styles.imageHolder}>
                        <Image style={styles.image} source={require('../../../assets/mingmongkol.png')} />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>ชื่อ : นาย เขียนโปรแกรม เก่งจัง</Text>
                        <Text style={styles.textStyle}>เบอร์โทรศัพท์ : oxx-xxx-xxxx</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bottom}>
                <View style={styles.backdrop}>
                    <Pressable style={styles.clickable}>
                        <View style={{ width: 50 }} >
                            <MaterialIcons name='account-circle' size={50} color='#727272' />
                        </View>
                        <View style={styles.textHolder}>
                            <Text style={styles.buttonTitle}>แก้ไขข้อมูลส่วนตัว</Text>
                            <Text style={styles.buttonDescription}>แก้ไขข้อมูลส่วนตัวเช่น ชื่อ, เบอร์โทรศัพท์</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.clickable}>
                        <View style={{ width: 50, alignItems: 'center' }}>
                            <Entypo name='help-with-circle' size={43} color='#727272' />
                        </View>
                        <View style={styles.textHolder}>
                            <Text style={styles.buttonTitle}>ศูนย์ช่วยเหลือ</Text>
                            <Text style={styles.buttonDescription}>วิธีการใช้งานฟังก์ชันต่างๆแอพพลิเคชัน</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.clickable}>
                        <View style={{ width: 50, alignItems: 'center' }}>
                            <Entypo name='megaphone' size={43} color='#727272' />
                        </View>
                        <View style={styles.textHolder}>
                            <Text style={styles.buttonTitle}>แจ้งปัญหา</Text>
                            <Text style={styles.buttonDescription}>แจ้งปัญหาที่เกิดขึ้นในแอพ</Text>
                        </View>

                    </Pressable>
                </View>
                <Pressable style={styles.button} onPress={handleLogout}>
                    <Text style={{ color: 'red', fontSize: 25 }} >ออกจากระบบ</Text>
                </Pressable>
            </View>

        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    imageHolder: {
        height: '70%',
    },
    image: {
        height: '100%',
        aspectRatio: 1 / 1,
        borderRadius: 1000,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: windowWidth * 0.04,
    },
    wrapper: {
        
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    top_box: {
        width: '100%',
        flex: 1,
        backgroundColor: '#15ABFF',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    bottom: {
        flex: 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backdrop: {
        marginTop: '7%',
        width: '90%',
        height: 250,
        backgroundColor: 'rgb(255, 255, 255)',
    },
    clickable: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonTitle: {

        fontWeight: 'bold',
        fontSize: 20
    },
    buttonDescription: {
        color: '#777777',
        fontSize: 12,
    },
    textHolder: {
        marginLeft: 15,
    },
    image2: {
        height: '70%',
        aspectRatio: 1 / 1,
    },
    button: {

        backgroundColor: '#d1d1d1',
        height: 60,
        width: '90%',
        borderRadius: 5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});