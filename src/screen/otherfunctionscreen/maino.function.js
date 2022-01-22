import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, Button, Image} from 'react-native';

export default function OtherFunc({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable style={styles.imageContainer}
          onPress={() => navigation.push("Chatbot") }
        >
          <Image
            resizeMode="contain"
            style={{width: '100%'}}
            source={require('../../../assets/chatbot.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <View
            style={{
              width: '80%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.text1}>
              เเชทบอท
            </Text>
            <Text adjustsFontSizeToFit style={styles.text2}>
              ใช้แชทบอทเพื่อการเข้าถึงข้อมูลที่ง่ายกว่า
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.textContainer}>
          <View
            style={{
              width: '80%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.text1}>
              คลังข้อมูล
            </Text>
            <Text adjustsFontSizeToFit style={styles.text2}>
              เข้าถึงข้อมูลเกี่ยวกับโควิด-19 อย่างรวดเร็วเข้าถึงข้อมูลที่ง่ายกว่า
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate('information')}
          style={styles.imageContainer}
        >
          <Image
            resizeMode="contain"
            style={{width: '100%'}}
            source={require('../../../assets/resource.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  text1: {
    fontSize: 35,
    color: 'black',
    fontFamily: 'Prompt-Bold',
  },
  text2: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Prompt-Regular',
  },
});
