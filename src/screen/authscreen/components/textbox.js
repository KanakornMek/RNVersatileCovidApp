import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function TextBox({icon, size, placeholder, setState, password}) {
  const [color, setColor] = useState('gray');
  return (
    <View style={[styles.textBox, {borderColor: color}]}>
      <Feather name={icon} size={size} color={color} />
      <View
        style={{
          backgroundColor: color,
          width: 1,
          height: '70%',
          marginLeft: 15,
          marginRight: 10,
        }}
      />
      <TextInput
        secureTextEntry={password}
        placeholder={placeholder}
        style={{fontSize: size, width: '100%'}}
        onChangeText={text => setState(text)}
        onFocus={() => setColor('#36aac7')}
        onBlur={() => setColor('gray')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textBox: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
});
