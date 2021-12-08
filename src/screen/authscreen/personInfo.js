import React,{ useState, useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from "react-native";
import { SignUpInfo, SignUpsetInfo } from './components/signupNav';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function GetPersonInfo() {
    const PersonInfo = useContext(SignUpInfo);
    const SetPersonInfo = useContext(SignUpsetInfo);
    function handleSignUp() {
        auth().createUserWithEmailAndPassword(PersonInfo.email, PersonInfo.password)
        .then(() => {
            firestore().collection('users').add({
                firstname: PersonInfo.firstName,
                lastname: PersonInfo.lastName,
                email: PersonInfo.email,
                phoneNumber: PersonInfo.phoneNumber,
            }).then(() => {
                console.log('User added');
            }).catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    return (
        <View style={styles.container}>
            <TextForm title="ชื่อ" setText={(text) => SetPersonInfo.setFirstName(text)}/>
            <TextForm title="สกุล" setText={(text) => SetPersonInfo.setLastName(text)}/>
            <TextForm title="เบอร์โทรศัพท์" setText={(text) => SetPersonInfo.setPhoneNumber(text)}/>
            <Button title="press" onPress={handleSignUp} />
        </View>
    );
}

function TextForm({setText, title}) {
    return(
        <View>
            <Text>{title}</Text>
            <TextInput style={styles.textForm} onChangeText={(text) => setText(text)} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textForm: {
        borderWidth: 1,
        padding: 2,
    },
});