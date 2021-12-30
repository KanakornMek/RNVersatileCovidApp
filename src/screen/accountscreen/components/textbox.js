import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';

export default function TextBox({ title, value, style, keyType, limit, setState }) {
    return (
        <View style={[styles.container, style || {}]}>
            <Text>{title}</Text>
            <TextInput
                value={value}
                style={[styles.textStyle, styles.textBox]}
                keyboardType={keyType ?? 'default'}
                maxLength={limit ?? undefined}
                onChangeText={(text) => {setState(text)}}
            />
            {/* divider view */}
            <View style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    textBox: {
        padding: 0,
        margin: 0,
        width: '100%',
    },
    textStyle: {
        fontSize: 20,
        fontFamily: 'Prompt-Regular',
    },
    divider: {
        borderWidth: 0.5,
        backgroundColor: 'black',
    },
});