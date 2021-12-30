import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    SafeAreaView,
    Modal,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TextBox from '../components/textbox';
import PlatformPicker from '../components/picker';
import { AuthContext } from '../../../components/navbar'
import ImageCropPicker from 'react-native-image-crop-picker';
const days = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
const months = ['-', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
export default function EditProfile({ navigation }) {
    const authData = useContext(AuthContext);
    const [image, setImage] = useState({ path: authData.profilePic });
    const [imagechanged, setImagechanged] = useState(false);
    const [firstname, setFirstname] = useState(authData.firstname);
    const [lastname, setLastname] = useState(authData.lastname);
    const [birthMonth, setBirthMonth] = useState('');
    const [birthday, setBirthday] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [gender, setGender] = useState(authData.gender === 'male' ? 1 : 2);
    const [birthDate, setBirthdate] = useState(0);
    const uid = auth().currentUser.uid;
    function uploadtoStorage() {
        storage().ref(`userData/${uid}/profilePic`).putFile(image.path).then(() => {
            updateInfo();
        })
    }
    async function updateInfo() {

        const url = await storage().ref(`userData/${uid}/profilePic`).getDownloadURL();
        firestore().collection('users').doc(uid).update({
            profilePic: url,
            firstname: firstname,
            lastname: lastname,
            gender: gender === 1 ? 'male' : 'female',
            birthDate: birthDate,
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <TouchableOpacity onPress={() => {
                    ImageCropPicker.openPicker({
                        width: 250,
                        height: 250,
                        cropping: true,
                        cropperCircleOverlay: true,
                    }).then(img => {
                        setImagechanged(true);
                        setImage(img);
                    })
                }}>
                    <Image style={styles.avatar} source={{ uri: (image.path || '') }} />
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>
                <Text></Text>
                <TextBox title={'ชื่อ'} value={firstname} setState={setFirstname} />
                <TextBox title={'สกุล'} value={lastname} setState={setLastname} />
                <View style={styles.row}>
                    <PlatformPicker
                        items={['ชาย', 'หญิง']}
                        setSelected={setGender}
                        selected={gender}
                        title={'เพศ'}
                        style={{ flex: 1 }}
                    />
                    <TextBox title={'เบอร์โทรศัพท์'} value={'0953333333'} keyType={'phone-pad'} limit={10} style={{ flex: 1 }} />
                </View>
                <View style={styles.row}>

                    <PlatformPicker
                        selected={birthday}
                        setSelected={setBirthday}
                        style={{ flex: 1.5 }}
                        items={days}
                        title={'วันเกิด'}
                    />
                    <PlatformPicker
                        selected={birthMonth}
                        setSelected={setBirthMonth}
                        style={{ flex: 2 }}
                        items={months}
                        title={'เดือน'}
                    />
                    <TextBox
                        title={'ปีเกิด(ค.ศ)'}
                        style={{ flex: 1, paddingLeft: 10 }}
                        value={birthYear}
                        setState={setBirthYear}
                    />
                </View>

            </View>
            <Button title='Press' onPress={() => {
                setBirthdate(getDate(birthday, birthMonth, birthYear));
                { imagechanged ? uploadtoStorage() : updateInfo() }
                
            }} />
        </View>
    );
}

// turn day month year into date unix timestamp 
function getDate(day, month, year) {
    console.log(day, month, year);
    var dayInt = (parseInt(day) - 1);
    var monthInt = (parseInt(month) - 1);
    var yearInt = parseInt(year);
    console.log(dayInt, monthInt, yearInt);
    var date = new Date(yearInt, monthInt, dayInt).getTime();
    console.log(date);
    return date;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
    avatarContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        height: '100%',
        aspectRatio: 1 / 1,
        borderRadius: 1000,
    },
});