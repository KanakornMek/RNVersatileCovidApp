import React from "react";
import {
    View,
    StyleSheet,
    Text,
} from "react-native";

export default function Message({ sent, message }) {
  return (
    <View style={[msgStyles.container, { alignItems: (sent ? 'flex-end' : 'flex-start') }]} >
      <View style={[msgStyles.msg, { backgroundColor: (sent ? '#56b533' : '#cccccc') }]}>
        <Text style={{ fontSize: 20 }}>{message}</Text>
      </View>
    </View>
  );
}

const msgStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
  },
  msg: {
    padding: 8,
    maxWidth: 200,
    borderRadius: 5,
  }
})
