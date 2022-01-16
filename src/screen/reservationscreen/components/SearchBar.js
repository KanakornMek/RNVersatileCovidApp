import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function SearchBar({query, setQuery}){
    return (
        <View style={styles.container}>
            <TextInput 
                value={query} 
                onChangeText={(text) => {
                    setQuery(text)
                }}
                style={styles.textInput} />
            <FontAwesome name="search" size={20} style={{marginRight: 10}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderRadius: 100,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textInput: {
        flex: 1,
        margin: 0,
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: 20,
        fontFamily: 'Prompt-Regular'
    }
})