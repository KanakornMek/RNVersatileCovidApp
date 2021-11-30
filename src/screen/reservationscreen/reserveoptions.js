import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import PlatformPicker from "./components/picker";
import Foundation from 'react-native-vector-icons/Foundation';

export default function ReserveOpt({navigation}) {
  const [hospitals, setHospital] = useState([
    {
      hospital_name: 'รพ.จุฬาลงกรณ์',
      available: 250,
      allbed: 500,
      setBool: false,
    },
    {
      hospital_name: 'รพ.กรุงเทพ',
      available: 300,
      allbed: 500,
    },
    {
      hospital_name: 'รพ.รามาธิบดี',
      available: 210,
      allbed: 500,
    },
    {
      hospital_name: 'รพ.ศิริราช',
      available: 216,
      allbed: 500,
    },
    {
      hospital_name: 'รพ.วิภาวดี',
      available: 200,
      allbed: 500,
    },
    {
      hospital_name: 'Triamudom',
      available: 200,
      allbed: 500,
    },

  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>โปรดระบุจังหวัด</Text>
      <PlatformPicker
        pickplacehold={"กรุณาเลือกจังหวัด"}
        items={[
          {
            label: "กรุงเทพมหานคร",
            value: "กรุงเทพมหานคร",
          },
          {
            label: "กระบี่",
            value: "กระบี่",
          },
          {
            label: "กาญจนบุรี",
            value: "กาญจนบุรี",
          },
          {
            label: "กาฬสินธุ์",
            value: "กาฬสินธุ์",
          },
        ]}
      />
      <Text style={styles.textStyle}>โปรดระบุเขต</Text>
      <PlatformPicker
        pickplacehold={"กรุณาเลือกเขต"}
        items={[
          {
            label: "พญาไท",
            value: "พญาไท",
          },
        ]}
      />
      <View style={{ width: "100%", alignItems: "center", marginVertical: 15 }}>
        <TouchableHighlight
          style={{ width: "95%", borderRadius: 10 }}
          activeOpacity={0.8}
          onPress={() => alert("Pressed!")}
        >
          <View style={styles.searchButton}>
            <Text style={{ color: "white", fontSize: 17 }}>ค้นหา</Text>
          </View>
        </TouchableHighlight>
        
      </View>
      <ScrollView>
        {hospitals.map((hospital, index) => {
          return(
            <Pressable onPress={() => navigation.push('chooseRoom',{dataParams: hospital})} key={index} style={styles.hospitalBox}>
              <View style={styles.titleBox} >
                <Foundation name="plus" size={30} color='red' />
                <Text style={styles.titleText}>{hospital.hospital_name}</Text>
              </View>
              <Text>เตียงว่าง: <Text>{hospital.available}</Text>/<Text>{hospital.allbed}</Text></Text>
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