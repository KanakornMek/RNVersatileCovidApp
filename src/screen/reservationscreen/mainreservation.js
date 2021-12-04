import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import Dropdown from "./components/Dropdown.js";
import firestore from '@react-native-firebase/firestore';

export default function MainReserve({ navigation }) {
  const [data, setData] = useState({});
  const [appoints, setAppoint] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const subscriber = firestore()
      .collection('reserveBed')
      .doc('UcPqW782Wp92QGZIEn8M')
      .collection('patients')
      .doc('ZzXpaMEdZRIGm1jjcLkF')
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      {loading && 
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={'#336c95'} />
        
      </View>
      }
      <View>
        <Text style={styles.title}>เข้ารับบริการ</Text>
      </View>
      <View style={styles.wrapper}>
        <Pressable
          onPress={() => navigation.push("chooseHospital")}
          style={styles.reserveBed}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/reserve-bed-icon.png")}
            onProgress={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
        </Pressable>
        <Pressable style={styles.homeIsolate}>
          <Image
            style={styles.image}
            source={require("../../../assets/home-isolate.png")}
            onProgress={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>กิจกรรม</Text>
      </View>

      {/* {appoints.map((apdoc) => {
                return (
                    <Dropdown key={apdoc.key} title={`นัดพบแพทย์`} date={timeConverter(apdoc.appoint_time)} text={apdoc.doctor_name} />
                );
            })} */}
      <Dropdown title={`พบแพทย์ออนไลน์`} text={"แพทย์ : Mingmongkol"} />
      <Dropdown
        title={`ลงทะเบียนเข้ารับบริการ`}
        text={
          "ลงทะเบียนเมื่อ :" /*+ timeConverter(data.register_date)*/ +
          "\nเข้ารับบริการกับ :" /*+data.hospital_name*/ +
          "\nระยะเวลา :" /*+ data.service_time*/
        }
      />
    </View>
  );
}

function timeConverter(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString("th-TH");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  loadingScreen: {
    zIndex: 1000,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
    marginLeft: 20,
  },

  wrapper: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  reserveBed: {
    width: "40%",
    aspectRatio: 1 / 1,
  },
  homeIsolate: {
    width: "40%",
    aspectRatio: 1 / 1,
  },
  image: {
    borderRadius: 10,
    flex: 1,
    width: "100%",
  },
});