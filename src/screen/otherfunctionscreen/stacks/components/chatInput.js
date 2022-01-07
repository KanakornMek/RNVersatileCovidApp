import React from "react";
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import auth from '@react-native-firebase/auth';
const uid = auth().currentUser.uid;
export default function ChatInput() {
    const [textIn, setTextIn] = React.useState('');
    return (
      <View style={inputStyles.container}>
        <View style={inputStyles.inputWrapper}>
          <TextInput value={textIn} onChangeText={(text) => setTextIn(text)} style={inputStyles.input} placeholder='fffff' />
  
          <TouchableOpacity onPress={() => {
            axios.post('https://us-central1-nsc-covidapp.cloudfunctions.net/dialogflowGateway', {
              userId: uid,
              queryInput: {
                text: {
                  text: textIn,
                  languageCode: "th"
                }
              }
            }).then(res => { console.log(res.data) }).catch(err => { console.log(err) });
            setTextIn('');
          }}>
            <Ionicons name="send" color={'#0086e8'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const inputStyles = StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: '#bfbfbf',
      paddingHorizontal: 10,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center'
    },
    input: {
      marginRight: 5,
      fontSize: 15,
      padding: 5,
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      paddingHorizontal: 10,
    }
  })
  