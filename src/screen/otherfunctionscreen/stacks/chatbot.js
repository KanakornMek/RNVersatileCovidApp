import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';


import ChatInput from './components/chatInput';
import Message from './components/message';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default function Chatbot() {
  var visited = false;
  const uid = auth().currentUser ? auth().currentUser.uid : '';
  const [msg, setMsg] = React.useState([]);
  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('chatbot')
      .doc(uid).collection('messages')
      .orderBy('createdOn', 'asc')
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setMsg(data);
      })
    return () => unsubscribe();
  }, []);


  const scrollViewRef = React.useRef();
  const [closeToBottom, setCloseToBottom] = React.useState(false);
  const [scrollButton, setScrollButton] = React.useState(false);

  React.useEffect(() => {
    if (closeToBottom) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
    else if (!visited) {
      scrollViewRef.current.scrollToEnd({ animated: false });
      visited = true;
    }
    else {

      setScrollButton(true);
    }
  }, [msg]);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} >
      <View style={{ flex: 1 }} >
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setCloseToBottom(true);
            }
            else {
              setCloseToBottom(false);
            }
          }}
          ref={scrollViewRef}
          contentContainerStyle={{ padding: 10 }}
        >
          {msg.map((item, index) => {
            return (
              <Message key={index} message={item.text} sent={(item.createdBy === 'user' ? 1 : 0)} />
            );
          })}
        </ScrollView>
        {scrollButton &&
          <TouchableOpacity onPress={() => {
            scrollViewRef.current.scrollToEnd({ animated: true })
            setScrollButton(false)
          }}>
            <View style={styles.scrollButton}>
              <Text style={{ color: 'white' }}>แสดงข้อความใหม่</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
      <ChatInput
        scrollRef={scrollViewRef}
        message={msg}
        setMessage={setMsg}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollButton: {
    padding: 8,
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(38, 38, 38, 0.8)',
  }
});




