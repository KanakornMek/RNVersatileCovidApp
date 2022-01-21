import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import algoliasearch from 'algoliasearch/lite';
import auth from '@react-native-firebase/auth';

export default function HomeIsoServices({navigation}) {
    const uid = auth().currentUser.uid;
    const client = algoliasearch('UPNR7GK49B', 'fd732a6eb5982ea2a1afa980537d3fcd');
    const index = client.initIndex('homeIsolate');
    const requestOptions = {
        headers: { 'X-Algolia-UserToken': uid }
    };
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    useEffect(() => {
        index.search(query, requestOptions).then(({ hits }) => {
            setResults(hits);
            console.log(hits);
        })
    }, [query])
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#1ab7fe', width: '100%', alignItems: 'center' }}>
                <Text style={textStyles.searchTitle}>ค้นหาผู้ให้บริการ</Text>
                <SearchBar query={query} setQuery={setQuery} />
            </View>
            <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
                {results.map((item, index) => {
                    return (
                        <Pressable 
                            key={index} 
                            style={styles.itemBox}
                            onPress={() => {
                                navigation.navigate('HomeIsoPreview', 
                                    {
                                        hospital_name: item.hospital_name, 
                                        hospital_id: item.objectID,
                                        price: item.price
                                    })
                                //'HomeIsoPreview'
                            }}
                        >
                            <View style={{ height: 100, aspectRatio: 1, backgroundColor: 'red' }} />
                            <View style={styles.detail}>
                                <Text style={textStyles.resultTitle}>{item.hospital_name}</Text>
                                <Text>ค่าบริการ</Text>
                            </View>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    itemBox: {
        flexDirection: 'row',
        width: '90%',
        margin: 10,
        borderWidth: 1,
    },
    detail: {
        padding: 10
    },

});

const textStyles = StyleSheet.create({
    searchTitle: {
        fontSize: 25,
        fontFamily: 'Prompt-Bold',
        color: 'white'
    },
    resultTitle: {
        fontFamily: 'Prompt-Bold',
        fontSize: 25,
        color: 'black'
    }
})