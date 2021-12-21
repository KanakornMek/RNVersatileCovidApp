import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
  Button,
  TouchableHighlight,
} from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function Room({ route, navigation }) {
    const hospitalName= route.params.dataParams.hospital_name;
  return (
    <ScrollView style={styles.container}>
      <Shadow containerViewStyle={{ margin: 10 }}>
        <View style={styles.roomContainer}>
          <Image
            style={{
              width: "100%",
              aspectRatio: 2 / 1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            source={{
              uri: "https://www.vejthani.com/wp-content/uploads/2020/01/PREMIUM-WARD-GRAND-SINGLE-6.jpg",
            }}
          />

          <View style={styles.roomdetailBox}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleRoom}>ห้องเดี่ยว</Text>
              <TouchableHighlight
                style={{ borderRadius: 15 }}
                activeOpacity={0.8}
                onPress={() => navigation.push('ReserveForm',{hospitalName: hospitalName,roomType: 'ห้องเดี่ยว'})}
              >
                <View style={styles.button}>
                  <Text style={{ color: "white", fontSize: 20, margin: 5 }}>
                    จอง
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View>
              <Text style={{ color: "#595959" }}>คงเหลือ 100 เตียง</Text>
            </View>
          </View>
        </View>
      </Shadow>
      <Shadow containerViewStyle={{ margin: 10 }}>
        <View style={styles.roomContainer}>
          <Image
            style={{
              width: "100%",
              aspectRatio: 2 / 1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            source={{
              uri: "https://www.gannett-cdn.com/-mm-/bd28db540009f871cff8a10081fa6b265ee35a78/c=0-50-2222-1300/local/-/media/2020/03/16/USATODAY/usatsports/gettyimages-1153684245.jpg?width=660&height=372&fit=crop&format=pjpg&auto=webp",
            }}
          />

          <View style={styles.roomdetailBox}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleRoom}>ห้องรวม</Text>
              <TouchableHighlight
                style={{ borderRadius: 15 }}
                activeOpacity={0.8}
                onPress={() => alert("Pressed!")}
              >
              <View style={styles.button}>
                <Text style={{ color: "white", fontSize: 20, margin: 5 }}>
                  จอง
                </Text>
              </View>
              </TouchableHighlight>
            </View>
            <View>
              <Text style={{ color: "#595959" }}>คงเหลือ 100 เตียง</Text>
            </View>
          </View>
        </View>
      </Shadow>
      <Shadow containerViewStyle={{ margin: 10 }}>
        <View style={styles.roomContainer}>
          <Image
            style={{
              width: "100%",
              aspectRatio: 2 / 1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            source={{
              uri: "https://www.gannett-cdn.com/-mm-/bd28db540009f871cff8a10081fa6b265ee35a78/c=0-50-2222-1300/local/-/media/2020/03/16/USATODAY/usatsports/gettyimages-1153684245.jpg?width=660&height=372&fit=crop&format=pjpg&auto=webp",
            }}
          />

          <View style={styles.roomdetailBox}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleRoom}>ห้องรวม</Text>
              <TouchableHighlight
                style={{ borderRadius: 15 }}
                activeOpacity={0.8}
                onPress={() => alert("Pressed!")}
              >
              <View style={styles.button}>
                <Text style={{ color: "white", fontSize: 20, margin: 5 }}>
                  จอง
                </Text>
              </View>
              </TouchableHighlight>
            </View>
            <View>
              <Text style={{ color: "#595959" }}>คงเหลือ 100 เตียง</Text>
            </View>
          </View>
        </View>
      </Shadow>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  roomContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 15,
  },
  roomdetailBox: {
    flex: 1,
    margin: 10,
    padding: 5,
  },
  titleRoom: {
    fontWeight: "bold",
    fontSize: 25,
  },
  button: {
    paddingHorizontal: 20,
    backgroundColor: "#15abff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});