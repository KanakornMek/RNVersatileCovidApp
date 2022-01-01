import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import ImageCropPicker from "react-native-image-crop-picker";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PreviewImg from "./components/modalPreviewImg";
import ImgPicker from "./components/imgpicker";
export default function AddDocuments() {
    const [IdwithFace, setIdwithFace] = useState({});
    const [IdImg, setIdImg] = useState({});
    const [covidTest, setCovidTest] = useState({});
    return (
        <>
            <View style={styles.container}>
                <Image style={styles.img} source={{ uri: "https://www.vejthani.com/wp-content/uploads/2020/01/PREMIUM-WARD-GRAND-SINGLE-6.jpg" }} />
                <ImgPicker 
                    title='เเนบรูปถ่ายบัตรประชาชนพร้อมหน้าเจ้าของ' 
                    img={IdwithFace} 
                    setImg={setIdwithFace} 
                />
                <ImgPicker 
                    title='เเนบรูปถ่ายบัตรประชาชน'
                    img={IdImg}
                    setImg={setIdImg}
                />
                <ImgPicker
                    title='เเนบไฟล์การตรวจโควิด'
                    img={covidTest}
                    setImg={setCovidTest}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    img: {
        width: "80%",
        aspectRatio: 4 / 3,
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