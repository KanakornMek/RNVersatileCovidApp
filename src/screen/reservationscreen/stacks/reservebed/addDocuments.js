import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../../components/navbar'
import ImgPicker from "./components/imgpicker";


export default function AddDocuments() {
    const authData = useContext(AuthContext);
    const [IdwithFace, setIdwithFace] = useState({});
    const [IdImg, setIdImg] = useState({});
    const [covidTest, setCovidTest] = useState({});
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
               <Pressable onPress={() => {

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