import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    Pressable
} from 'react-native';


export default function AddressForm({route, navigation}) {
    const hospitalId = route.params.hospitalId;
    const [address, setAddress] = useState('');
    const [tumbon, setTumbon] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');


    return (
        <View style={styles.container}>
            <FormInput title={'ที่อยู่'} state={address} setState={setAddress} />
            <FormInput title={'แขวง/ตำบล'} state={tumbon} setTumbon={setTumbon} />
            <FormInput title={'เขต/อำเภอ'} state={district} setState={setDistrict} />
            <FormInput title={'จังหวัด'} state={province} setState={setProvince} />
            <FormInput title={'รหัสไปรษณีย์'} state={postalCode} setState={setPostalCode} />
            <Pressable 
                style={{
                    backgroundColor: '#15abff', 
                    padding: 8, 
                    marginTop: 10, 
                    width: '80%',
                    alignItems: 'center'
                }}
                onPress={() => navigation.navigate('addDocsHomeIso',{hospitalId: hospitalId})}
            >
                <Text style={{fontFamily: 'Prompt-Regular', color: 'white', fontSize: 18}}>ต่อไป</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
})

function FormInput({title, state, setState}) {
    return (
        <View style={{ width: '90%', }}>
            <Text style={stylesForm.title}>{title}</Text>
            <TextInput 
                style={{ 
                    padding: 5,
                    fontFamily: 'Prompt-Regular',
                    fontSize: 20,
                    borderWidth: 1,
                    borderColor: '#bfbebe'
                }}
                value={state}
                onChangeText={(text) => {
                    setState(text);
                }}
                spellCheck={false}
                autoCorrect={false} 
            />
        </View>
    );
}

const stylesForm = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'Prompt-Regular'
    }
})