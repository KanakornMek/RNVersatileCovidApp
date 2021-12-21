import React, { useState, useContext } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  Button,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../../components/navbar";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default function Form({ route, navigation }) {
  const authData = useContext(AuthContext);
  const hospitalData = route.params.hospitalData;
  const hospitalId = route.params.hospitalId;
  const hospitalName = hospitalData.hospital_name || "";
  const roomType = route.params.roomType;
  const [name, setName] = useState(authData.firstname);
  const [surname, setSurname] = useState(authData.lastname);
  const [phonenumber, setPhonenumber] = useState(authData.phoneNumber);
  
  function handleSubmit(){
    console.log(hospitalId);
    if(hospitalId){
    firestore().collection('reserveBed').doc(hospitalId).collection('requests').add({
      firstname: name,
      lastname: surname,
      phoneNumber: phonenumber,
      roomType: roomType,
      userId: auth().currentUser.uid,
    }).then(() => {
      console.log('success');
    });
  }
    
  }
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }}
      extraScrollHeight={10}
    >
      <View style={styles.container}>
        <Image
          style={{ width: "100%", aspectRatio: 2 / 1 }}
          source={{
            uri: "https://www.vejthani.com/wp-content/uploads/2020/01/PREMIUM-WARD-GRAND-SINGLE-6.jpg",
          }}
        ></Image>
        <Shadow
          containerViewStyle={{ top: -20 }}
          startColor="#646464"
          sides="top"
          corners={["topLeft", "topRight"]}
        >
          <View style={styles.form}>
            <Text style={styles.titleText}>โรงพลาบาล</Text>
            <Text style={styles.text}>{hospitalName}</Text>
            <Text style={styles.titleText}>ประเภทของห้อง</Text>
            <Text style={[styles.text, { marginBottom: 10 }]}>{roomType}</Text>

            <InputFormField label="ชื่อ" setState={setName} value={name} />
            <InputFormField label="นามสกุล" setState={setSurname} value={surname} />

            <InputFormField label="ิอายุ" />
            <InputFormField label="เบอร์โทรศัพท์" setState={setPhonenumber} value={phonenumber} />
            <InputFormField label="ที่อยู่" />

            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: 25,
              }}
            >
              <Pressable
                onPress={handleSubmit}
                style={{
                  width: "85%",
                  backgroundColor: "#0291fb",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 7
                }}
              >
                <Text style={{ color: 'white' }}>ยืนยัน</Text>
              </Pressable>
            </View>
          </View>
        </Shadow>
      </View>
    </KeyboardAwareScrollView>
  );
}

function InputFormField({ label, setState, value }) {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <Text>{label}</Text>

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: focused ? "lightblue" : "gray",
          padding: 5,
          borderRadius: 5,
        }}
        placeholder={label}
        value={value}
        placeholderTextColor={focused ? "lightblue" : "gray"}
        onChangeText={(text) => setState(text)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  form: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    height: "100%",
    width: windowWidth,
  },

  titleText: {
    fontSize: 30,
  },
  text: {
    fontSize: 20,
  },
});