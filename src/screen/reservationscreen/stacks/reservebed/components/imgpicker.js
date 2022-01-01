import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    Platform,
} from "react-native";
import PreviewImg from "./modalPreviewImg";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from "react-native-image-crop-picker";

export default function ImgPicker({ img, setImg, title }) {
    const [modal, setModal] = React.useState(false);
    const [added, setAdded] = React.useState(false);
    const [imgFilename, setImgFilename] = React.useState("");
    function handleCamera(){
        ImageCropPicker.openCamera({
            width: 800,
            height: 1200, 
            mediaType: "photo",            
        }).then(image => {
            setImg(image);
            console.log(image);
            var filename = image.path.replace(/^.*[\\\/]/, '');
            setImgFilename(filename);
            setAdded(true);

        });
    }
    function handleImage(){
        ImageCropPicker.openPicker({
            width: 800,
            height: 1200,
            mediaType: "photo",
        }).then(image => {
            setImg(image);
            console.log(image);
            var filename = image.path.replace(/^.*[\\\/]/, '');
            setImgFilename(filename);
            setAdded(true);
        });
    }
    return (
        <>
            <PreviewImg show={modal} setShow={setModal} img={img} />
            <View style={{width: '100%'}} >
                <Text style={styles.textStyle}>{title}</Text>
                {!added ?
                    <TouchableOpacity onPress={() => {
                        {Platform.OS === 'android' && (
                            Alert.alert(
                                'กรุณาเลือกรูปภาพ',
                                 'เลือกวิธีการเลือกรูปภาพ',
                                [
                                    {
                                        text: 'ถ่ายรูปภาพ',
                                        onPress: () => handleCamera()
                                    },
                                    {
                                        text: 'เลือกรูปภาพจากคลังรูปภาพ',
                                        onPress: () => handleImage()
                                    },
                            
                            ])
                        )}
                        
                    }}>
                        <MaterialCommunityIcons name="plus-box-outline" size={30} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => { setModal(true) }} >
                        <View style={styles.fileBox} >
                            <Ionicons name="image" color={'red'} size={20} />
                            <View style={{maxWidth: '85%'}} >
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ marginHorizontal: 10 }}>{imgFilename}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setAdded(false)
                                setImg("");
                                setImgFilename("");
                            }}>
                                <Text>x</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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
        padding: 5,
        maxWidth: '100%',
    }
});
