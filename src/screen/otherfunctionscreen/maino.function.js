import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Chatbot () {
    return(
        <View>
            <Text style={styles.testText} >Chatbot</Text>
            <Text style={{fontSize: 40, color: 'black'}} >Chatbot</Text>
            <Text style={{fontSize: 40, color: 'black', fontFamily: 'Prompt-Bold'}}>ภาษาไทย</Text>
            <Text style={{fontSize: 40}}>ภาษาไทย</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    testText: {
        fontSize: 40,
        color: 'black',
        fontFamily: 'Roboto-Regular',
        
     }
});