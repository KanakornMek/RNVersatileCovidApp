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
import firestore from "@react-native-firebase/firestore";

export default function Room({ route, navigation }) {
  const hospital = route.params.dataParams;
  const docId =hospital.id;
  const hosData = hospital.data;
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const subscriber = firestore().collection("reserveBed").doc(docId).collection("rooms")
    .onSnapshot((querySnapshot) => {
        var result = [];
        querySnapshot.forEach((doc) => {
            result.push({data: doc.data(), id: doc.id});
        });
        setRooms(result);

    });
    return () => subscriber();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {rooms.map((item, index) => {
        return (
          <Shadow key={index} containerViewStyle={{ margin: 10 }}>
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
                  <Text style={styles.titleRoom}>{item.data.room_title}</Text>
                  <TouchableHighlight
                    style={{ borderRadius: 15 }}
                    activeOpacity={0.8}
                    onPress={() => navigation.push('ReserveForm', { hospitalId: docId, hospitalData: hosData, roomType: item.data.room_title, roomId: item.id })}
                  >
                    <View style={styles.button}>
                      <Text style={{ color: "white", fontSize: 20, margin: 5 }}>
                        จอง
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View>
                  <Text style={{ color: "#595959" }}>คงเหลือ {item.data.available} เตียง</Text>
                </View>
              </View>
            </View>
          </Shadow>
        );
      }
      )}
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