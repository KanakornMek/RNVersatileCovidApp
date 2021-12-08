import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import TextBox from './components/textbox';

import auth from '@react-native-firebase/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setComfirmPass] = useState('');

  function handleSignUp() {
    auth().createUserWithEmailAndPassword(email, password);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ลงทะเบียน</Text>
      <TextBox icon="mail" size={20} placeholder="อีเมล" setState={setEmail} />
      <TextBox
        icon="lock"
        size={20}
        placeholder="รหัสผ่าน"
        setState={setPassword}
      />
      <TextBox
        icon="lock"
        size={20}
        placeholder="ยืนยันรหัสผ่าน"
        setState={setComfirmPass}
      />
      <TouchableOpacity onPress={handleSignUp}>
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
