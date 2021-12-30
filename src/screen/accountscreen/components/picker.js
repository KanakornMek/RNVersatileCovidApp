import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Button,
    TextInput,
    Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
export default function PlatformPicker({ items, setSelected, selected, style, title }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
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
                                            style={{ width: '100%' }}
                                            selectedValue={selected}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelected(itemValue);
                                            }}
                                        >
                                            {items.map((item, index) => {
                                                return (
                                                    <Picker.Item
                                                        key={index}
                                                        label={item}
                                                        value={index + 1}
                                                    />
                                                );
                                            })}
                                        </Picker>

                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <View style={[styles.container, style || {}]}>
                        <Text>{title}</Text>
                        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                            <View style={styles.selectedContainer} >
                                <Text style={styles.textStyle}>{months[selected - 1]}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </>
            )}
            {Platform.OS === "android" && (
                <>
                    <View style={[styles.container,style]}>
                        <Text>{title}</Text>
                        <Picker
                            style={{ width: '100%'}}
                            selectedValue={selected}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelected(itemValue);
                            }}
                        >
                            {items.map((item, index) => {
                                return (
                                    <Picker.Item
                                        key={index}
                                        label={item}
                                        value={index + 1}
                                    />
                                );
                            })}
                        </Picker>
                    </View>
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        height: 100,
        width: '100%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textStyle: {
        fontSize: 20,
        color: "black",
        textAlign: "center",

    },
    doneButton: {
        width: "100%",
    },
    selectedContainer: {
        width: '100%',
        backgroundColor: 'lightgray',
        padding: 3,
    }
});