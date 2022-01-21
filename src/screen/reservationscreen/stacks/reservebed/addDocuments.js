import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../../../components/navbar'
import ImgPicker from "./components/imgpicker";


const uid = auth().currentUser.uid;

export default function AddDocuments({ route }) {
    const hospitalId = route.params.hospitalId;
    const roomType = route.params.roomType;
    const roomId = route.params.roomId;
    console.log(roomType, hospitalId);
    const authData = useContext(AuthContext);
    console.log(authData.requestRef);
    const [IdwithFace, setIdwithFace] = useState({});
    const [IdImg, setIdImg] = useState({});
    const [covidTest, setCovidTest] = useState({});

    const [disable, setDisable] = useState(false);
    return (
        <>
            <View style={styles.container}>
                <Image style={styles.img} source={{ uri: "https://www.vejthani.com/wp-content/uploads/2020/01/PREMIUM-WARD-GRAND-SINGLE-6.jpg" }} />
                <ImgPicker
                    title='แนบรูปถ่ายบัตรประชาชนพร้อมหน้าเจ้าของ'
                    img={IdwithFace}
                    setImg={setIdwithFace}
                />
                <ImgPicker
                    title='แนบรูปถ่ายบัตรประชาชน'
                    img={IdImg}
                    setImg={setIdImg}
                />
                <ImgPicker
                    title='แนบไฟล์การตรวจ PCR'
                    img={covidTest}
                    setImg={setCovidTest}
                />
                <Pressable
                    disabled={disable}
                    onPress={() => {
                        setDisable(true)
                        if (!authData.requestRef) {
                            storage().ref(`reserveBed/${hospitalId}/patients/${uid}/FacewithID`).putFile(IdwithFace.path).then(() => {
                                storage().ref(`reserveBed/${hospitalId}/patients/${uid}/IdImg`).putFile(IdImg.path).then(() => {
                                    storage().ref(`reserveBed/${hospitalId}/patients/${uid}/covidTest`).putFile(covidTest.path).then(() => {
                                        console.log('a')
                                        firestore().collection('reserveBed').doc(hospitalId).collection('requests').add({
                                            firstname: authData.firstname,
                                            lastname: authData.lastname,
                                            email: authData.email,
                                            birthDate: authData.birthDate,
                                            phoneNumber: authData.phoneNumber,
                                            userId: uid,
                                            roomType: roomType,
                                            roomId: roomId,
                                            createdOn: firestore.FieldValue.serverTimestamp(),
                                        }).then((docRef) => {
                                            console.log('b')
                                            firestore().collection('users').doc(uid).get().then((docData) => {
                                                console.log('c')
                                                if (docData.data().history) {
                                                    var hist = docData.data().history;
                                                } else {
                                                    var hist = [];
                                                }
                                                firestore().collection('users').doc(uid).update({
                                                    requestRef: docRef,
                                                    history: [...hist,
                                                    {
                                                        title: 'คุณได้ลงทะเบียนจองเตียงแล้ว',
                                                        createdOn: firestore.Timestamp.now(),
                                                        message: 'กรุณารอคำอนุมัติจากโรงพยาบาล'
                                                    }
                                                    ]
                                                }).then(() => {
                                                    setDisable(false);
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        } else {
                            setDisable(false);
                            Alert.alert('คุณได้จองไว้ที่โรงพยาบาลอื่นแล้ว')
                        }
                    }}>
                    <Text>ยืนยัน</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    img: {
        width: "80%",
        aspectRatio: 4 / 3,
        marginBottom: 50
    },
    textStyle: {
        fontSize: 20,
        fontFamily: 'Prompt-Regular',
    },
    fileBox: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'flex-start',
        alignItems: 'center',
        maxWidth: '100%',
        padding: 5,
    }
});