import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Button,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PlatformPicker({ items, pickplacehold, setSelected, selected, setIndex, onChangeSelect }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <>

      <Modal
        presentationStyle="overFullScreen"
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <View style={styles.doneButton}>
                  <Button
                    title="Done"
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
                <TextInput style={{borderBottomWidth: 1, padding: 0, marginVertical: 10, width: '85%', fontSize: 20 }} underlineColorAndroid='transparent' textAlign="center" onChangeText={(text) => setSearchTerm(text)} />
                <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.picker}>
                  {items.filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (val.name_th.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return val;
                    }
                  }).map((item, index) => {
                    return (
                      <TouchableOpacity key={index} onPress={() => {
                        setSelected(item.name_th);
                        setIndex(index);
                        setModalVisible(!modalVisible);
                        onChangeSelect && onChangeSelect();
                      }}>
                        <Text style={{ fontSize: 25 }} key={index}>{item.name_th}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={{ width: '100%', alignItems: 'center', marginTop: 10, }}>
        <Pressable
          style={styles.pickerButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>{selected === '' ? pickplacehold : selected}</Text>
          <AntDesign name={'caretdown'} size={15} color={'#4b4b4b'} />
        </Pressable>
      </View>


    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 100,
  },
  modalView: {
    width: "90%",
    height: '50%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },

  textStyle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginLeft: 10,
  },
  doneButton: {
    width: "100%",
    alignItems: "flex-end",
  },
  pickerButton: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '95%',
    backgroundColor: '#c9c9c9',
  },
  picker: {
    alignItems: 'center',
  }
});