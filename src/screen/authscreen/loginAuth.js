import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import TextBox from './components/textbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('admin@o.com');
  const [password, setPassword] = useState('123456');

  function handleLogin() {
    auth().signInWithEmailAndPassword(email, password).then(() => {
      navigation.navigate('Navbar');
    });
  }
  return (
    <KeyboardAwareScrollView contentContainerStyle={{alignItems: 'center'}} style={styles.container} keyboardVerticalOffset={10}>
      <Image
        style={{width: 150, height: 150, marginVertical: 100}}
        source={{
          uri: 'https://smartsolutioncomputer.com/upload-img/Products/Cisco/Webex-logo.png',
        }}
      />
      <View style={{width: '70%'}}>
        <Text style={styles.title}>เข้าสู่ระบบ</Text>
      </View>
      <TextBox icon="mail" size={20} placeholder="อีเมล" setState={setEmail} />
      <TextBox
        icon="lock"
        size={20}
        placeholder="รหัสผ่าน"
        setState={setPassword}
        password
      />
      <TouchableOpacity onPress={handleLogin}>
        <View style={styles.loginButton}>
          <Text adjustsFontSizeToFit style={{color: 'white', fontSize: 50}}>
            เข้าสู่ระบบ
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUpNav')}
        style={{marginTop: 20}}>
        <Text style={{fontWeight: 'bold'}}>สมัครสมาชิก</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    
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
    color: 'black'
},
});
