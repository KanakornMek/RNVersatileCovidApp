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
  ScrollView,
} from "react-native";
import Dropdown from "./components/Dropdown.js";
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
const uid = auth().currentUser.uid;

export default function MainReserve({ navigation }) {
  const [data, setData] = useState({});
  const [appoints, setAppoint] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hist, setHist] = useState([]);
  useEffect(() => {
    const subscriber = firestore().collection('users')
      .doc(uid).onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
        setHist(documentSnapshot.data().history);
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
        <Text style={[textStyles.text, textStyles.title]}>เข้ารับบริการ</Text>
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
        <Pressable 
          style={styles.homeIsolate}
          onPress={() => navigation.push('homeIso')}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/home-isolate.png")}
            onProgress={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
        </Pressable>
      </View>
      <View>
        <Text style={[textStyles.text, textStyles.title]}>กิจกรรม</Text>
      </View>

      {/* {appoints.map((apdoc) => {
                return (
                    <Dropdown key={apdoc.key} title={`นัดพบแพทย์`} date={timeConverter(apdoc.appoint_time)} text={apdoc.doctor_name} />
                );
            })} */}
      <ScrollView>

      {hist.map((his, index) => {
        return (
          <Dropdown key={index} title={his.title} text={his.message} />
          );
        })}
        </ScrollView>

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
    backgroundColor: '#fff'
  },
  loadingScreen: {
    zIndex: 1000,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

const textStyles = StyleSheet.create({
  text: {
    color: '#27264A'
  },
  title: {
    fontFamily: 'Prompt-Bold',
    fontSize: 25,
    marginTop: 20,
    marginLeft: 20,
  },

});