import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Button,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PlatformPicker({ items, pickplacehold, setSelected, selected, setIndex }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      {Platform.OS === "ios" && (
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
                    <Picker
                      style={{ width: "100%" }}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelected(itemValue)
                        setIndex(itemIndex)
                      }
                      }
                      selectedValue={selected}
                    >
                      <Picker.Item label={pickplacehold} value={pickplacehold} />
                      {items.default.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={item.name_th}
                            value={item.name_th}
                          />
                        );
                      })}
                    </Picker>
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
              <Text style={styles.textStyle}>{selected}</Text>
              <AntDesign name={'caretdown'} size={15} color={'#4b4b4b'} />
            </Pressable>
          </View>
        </>
      )}
      {Platform.OS !== "ios" && (
        <Picker
          style={{ width: "100%" }}
          onValueChange={(itemValue, itemIndex) => { setSelected(itemValue); setIndex(itemIndex) }}
          selectedValue={selected}
          
        >
          <Picker.Item label={pickplacehold} value={pickplacehold} />
          {items.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.name_th}
                value={item.name_th}
              />
            );
          })}
        </Picker>
      )}
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
});