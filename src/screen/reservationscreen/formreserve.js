import React, { useState } from "react";
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

export default function Form({ route, navigation }) {
  const hospitalName = route.params.hospitalName;
  const roomType = route.params.roomType;
  const [name, setName ] = useState("");
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

            <InputFormField label="ชื่อ" setState={setName} />
            <InputFormField label="นามสกุล" />

            <InputFormField label="ิอายุ" />
            <InputFormField label="เบอร์โทรศัพท์"  />
            <InputFormField label="ที่อยู่" />

            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: 25,
              }}
            >
              <View
                style={{
                  width: "85%",
                  backgroundColor: "#0291fb",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 7
                }}
              >
                <Text style={{color: 'white'}}>ยืนยัน</Text>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    </KeyboardAwareScrollView>
  );
}

function InputFormField({ label, setState }) {
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