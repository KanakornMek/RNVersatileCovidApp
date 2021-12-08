import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import TextBox from './components/textbox';
import {SignUpInfo, SignUpsetInfo} from './components/signupNav';

import auth from '@react-native-firebase/auth';

export default function SignUp({navigation}) {
  const PersonInfo = useContext(SignUpInfo);
  const SetPersonInfo = useContext(SignUpsetInfo);
  async function goPersonInfo() {
    const isEmailValid = await validateEmail(PersonInfo.email);
    const isPasswordValid = await validatePassword(PersonInfo.password, PersonInfo.confirmPassword);
    if (!isEmailValid) {
      Alert.alert('Invalid Email', 'Please enter a valid email');
      console.log('Email is not valid');
    }
    else if(!isPasswordValid){
      Alert.alert('Invalid Password', 'Please enter a valid password');
      console.log('Password is not valid');
    }
    else {
      navigation.navigate('GetPersonInfo');
    }
  }
  //function mail validation
  async function validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  //function confirm password
  async function validatePassword(password, confirmPassword) {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ลงทะเบียน</Text>
      <TextBox
        icon="mail"
        size={20}
        placeholder="อีเมล"
        setState={SetPersonInfo.setEmail}
      />
      <TextBox
        icon="lock"
        size={20}
        placeholder="รหัสผ่าน"
        setState={SetPersonInfo.setPassword}
      />
      <TextBox
        icon="lock"
        size={20}
        placeholder="ยืนยันรหัสผ่าน"
        setState={SetPersonInfo.setConfirmPassword}
      />
      <TouchableOpacity onPress={goPersonInfo}>
        <View style={styles.loginButton}>
          <Text adjustsFontSizeToFit style={{color: 'white', fontSize: 50}}>
            ต่อไป
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loginButton: {
    padding: 10,
    width: '50%',
    aspectRatio: 4 / 1,
    backgroundColor: '#01a9ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Prompt-Bold',
    color: 'black',
  },
});
