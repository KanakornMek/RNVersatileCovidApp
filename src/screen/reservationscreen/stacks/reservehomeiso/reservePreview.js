import React, { useState, useContext } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  Button,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../../../../components/navbar";
export default function ReservePreview({ route, navigation }) {
  const authData = useContext(AuthContext);
  const hospitalName = route.params.hospital_name;
  const hospitalId = route.params.hospital_id;
  const price = route.params.price;
  const [name, setName] = useState(authData.firstname);
  const [surname, setSurname] = useState(authData.lastname);
  const [phonenumber, setPhonenumber] = useState(authData.phoneNumber);
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }}
      extraScrollHeight={10}
    >
      <View style={styles.container}>
        <Image
          style={{ width: "100%", aspectRatio: 2 / 1 }}
          source={{
            uri: "https://www.bdms.co.th/wp-content/uploads/2019/09/Bangkok-Hospital.png",
          }}
        ></Image>
        <Shadow
          containerViewStyle={{ top: -20 }}
          startColor="#646464"
          sides="top"
          corners={["topLeft", "topRight"]}
        >
          <View style={styles.form}>
            <Text style={styles.titleText}>โรงพลาบาลผู้ให้บริการ</Text>
            <Text style={styles.text}>{hospitalName}</Text>
            <Text style={styles.titleText}>อัตราค่าบริการ(ไม่รวมค่ายา)</Text>
            <Text style={styles.text} >{price}</Text>
            <Text style={styles.titleText}>ข้อมูลส่วนตัว</Text>
            <Text style={styles.text}>ชื่อ {name}</Text>
            <Text style={styles.text}>นามสกุล {surname}</Text>
            <Text style={styles.text}>เบอร์โทรศัพท์ {phonenumber}</Text>

            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: 25,
              }}
            >
              <Pressable
                onPress={() => { navigation.navigate('AddressForm',{hospitalId: hospitalId}) }}
                style={{
                  width: "85%",
                  backgroundColor: "#0291fb",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 7
                }}
              >
                <Text style={{ color: 'white' }}>ต่อไป</Text>
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
    fontFamily: 'Prompt-Regular',
  },
  text: {
    fontFamily: 'Prompt-Regular',
    fontSize: 20,
  },
});