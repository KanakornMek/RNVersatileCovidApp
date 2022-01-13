import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Dropdown({ title, date, text }) {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container} >
            <View style={styles.wrapper}>
                <Pressable onPress={() => setOpen(!open)} style={styles.dropdown} >
                    <Text style={[textStyles.text, textStyles.title]}>{title}</Text>
                    <AntDesign name={open ? 'caretup' : 'caretdown'} size={25} color={'#949494'} />
                </Pressable>
                {open && <View style={styles.dropdown_item}>
                    <Text style={{ fontWeight: 'bold', }} >{text}</Text>
                </View>}
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    wrapper: {
        width: '100%',
        borderRadius: 5,

    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '100%',
        backgroundColor: '#bfbebe',
        padding: 10,

    },
    dropdown_item: {
        alignItems: 'flex-start',
        backgroundColor: '#9c9c9c',
        width: '100%',
        padding: 10,
    }
});


const textStyles = StyleSheet.create({
    text: {
        color: '#27264A',
    },
    title: {
        fontFamily: 'Prompt-Bold',
        fontSize: 20,
    }
})