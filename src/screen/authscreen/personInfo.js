import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {SignUpInfo, SignUpsetInfo} from './components/signupNav';

import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function GetPersonInfo({navigation}) {
  const PersonInfo = useContext(SignUpInfo);
  const SetPersonInfo = useContext(SignUpsetInfo);
  function handleSignUp() {
    auth()
      .createUserWithEmailAndPassword(PersonInfo.email, PersonInfo.password)
      .then(userCredential => {
        console.log(userCredential.user.uid);
        firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .set({
            firstname: PersonInfo.firstName,
            lastname: PersonInfo.lastName,
            email: PersonInfo.email,
            phoneNumber: PersonInfo.phoneNumber,
          })
          .then(() => {
            console.log('User added');
            navigation.reset({
              index: 0,
              routes: [{name: 'Navbar'}],
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextForm
          title="ชื่อ"
          setText={text => SetPersonInfo.setFirstName(text)}
        />
        <TextForm
          title="สกุล"
          setText={text => SetPersonInfo.setLastName(text)}
        />
        <TextForm
          title="เบอร์โทรศัพท์"
          setText={text => SetPersonInfo.setPhoneNumber(text)}
        />
        <Button title="press" onPress={handleSignUp} />
      </View>
    </View>
  );
}

function TextForm({setText, title}) {
  return (
    <View>
      <Text>{title}</Text>
      <TextInput style={styles.textForm} onChangeText={text => setText(text)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  textForm: {
    borderBottomWidth: 1,
    padding: 2,
  },
  form: {
    flex: 1,
    width: '85%',
  },
});
