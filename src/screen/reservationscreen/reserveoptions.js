import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Button,
  Image,
  TouchableHighlight,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import PlatformPicker from "./components/picker";
import Foundation from 'react-native-vector-icons/Foundation';

import * as loData from './utils/location.json';

const locationData = JSON.parse(JSON.stringify(loData));

export default function ReserveOpt({ navigation }) {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [provinceIndex, setProvinceIndex] = useState(1);
  const [districtIndex, setDistrictIndex] = useState(0);
  const [hospitals, setHospital] = useState([]);
  useEffect(() => {
    if (province !== "" && district !== "") {
      const subscriber = firestore().collection("reserveBed").where("province", "==", province).where("district", "==", district)
        .onSnapshot((querySnapshot) => {
          var result = [];
          querySnapshot.forEach((doc) => {
            result.push({ data: doc.data(), id: doc.id });
          });
          setHospital(result);
        });
      return () => subscriber();
    }
  });


  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>โปรดระบุจังหวัด</Text>
      <PlatformPicker
        pickplacehold={"กรุณาเลือกจังหวัด"}
        items={locationData.default}
        selected={province}
        setSelected={setProvince}
        setIndex={setProvinceIndex}
        onChangeSelect={() => {setDistrict(""); setDistrictIndex(0);}}
      />
      <Text style={styles.textStyle}>โปรดระบุเขต</Text>
      <PlatformPicker
        pickplacehold={"กรุณาเลือกเขต"}
        items={locationData.default[provinceIndex].amphure || []}
        selected={district}
        setSelected={setDistrict}
        setIndex={setDistrictIndex}
      />
      <View style={{ width: "100%", alignItems: "center", marginVertical: 15 }}>
        <TouchableHighlight
          style={{ width: "95%", borderRadius: 10 }}
          activeOpacity={0.8}
          onPress={() => Alert.alert('fff')}
        >
          <View style={styles.searchButton}>
            <Text style={{ color: "white", fontSize: 17 }}>ค้นหา</Text>
          </View>
        </TouchableHighlight>

      </View>
      <ScrollView>
        {hospitals.map((hospital, index) => {
          return (
            <Pressable onPress={() => navigation.push('chooseRoom', { dataParams: hospital })} key={index} style={styles.hospitalBox}>
              <View style={styles.titleBox} >
                <Foundation name="plus" size={30} color='red' />
                <Text style={styles.titleText}>{hospital.data.hospital_name}</Text>
              </View>
              <Text>เตียงว่าง: <Text>{hospital.data.available}</Text>/<Text>{hospital.data.allbed}</Text></Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textStyle: {
    fontSize: 25,
  },
  searchButton: {
    width: "100%",
    backgroundColor: "#2196f3",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  hospitalBox: {
    backgroundColor: '#cccccc',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 25,
    marginLeft: 10,
  },
});