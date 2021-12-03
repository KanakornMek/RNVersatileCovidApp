import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, Button, Image} from 'react-native';


export default function Chatbot() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={{flex: 1}}
            source={require('../../../assets/chatbot.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.text1}>
            เเชทบอท
          </Text>
          <Text adjustsFontSizeToFit style={styles.text2}>
            ใช้แชทบอทเพื่อการเข้าถึงข้อมูลที่ง่ายกว่า
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.text1}>
            คลังข้อมูล
          </Text>
          <Text adjustsFontSizeToFit style={styles.text2}>
            เข้าถึงข้อมูลเกี่ยวกับโควิด-19 อย่างรวดเร็วเข้าถึงข้อมูลที่ง่ายกว่า
          </Text>
        </View>
        <Pressable style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={{flex: 1}}
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
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'black',
  },
  text2: {
    fontSize: 20,
    color: 'black',
  },
});

