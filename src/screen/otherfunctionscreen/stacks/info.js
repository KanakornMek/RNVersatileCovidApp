import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    Image,
    Pressable
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Info({navigation}) {
    const [info, setInfo] = useState([]);
    useEffect(() => {
        const subscriber = firestore().collection('information').onSnapshot((snapshot) => {
            var results = [];
            snapshot.forEach((doc) => {
                results.push(doc.data());
                console.log(doc.data());
            })
            setInfo(results)
        })

        return () => subscriber();
    }, []);

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            {info.map((item, index) => {
                return (
                    <Pressable
                        onPress={() => navigation.navigate('ViewInfo')}
                        key={index} 
                        style={styles.infoContainer}
                    >
                        <Text style={styles.title} >{item.title}</Text>
                        <Entypo name='chevron-right' size={25} />
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
       width: '100%',
       borderBottomWidth: 1,
       borderColor: 'black',
       padding: 10,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Prompt-Regular',
        fontSize: 20,
        color: 'black'
    }
})