import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
export default function NewsComponent() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const subscriber = firestore().collection('news').onSnapshot((snapshot) => {
            var results = [];
            snapshot.forEach((doc) => {
                results.push(doc.data());

            });
            setNews(results);
        });

        return () => subscriber();
    })
    return (
        <View style={styles.newscontainer}>
            {news.map((item, index) => {
                const newsDate = new Date(item.publishedAt.seconds * 1000);
                return (

                    <View key={index} style={styles.news}>
                        <View style={styles.textContainer}>
                            <Text>{item.source}</Text>
                            <Text numberOfLines={3} style={textStyles.newsTitle}>{item.title}</Text>
                            <Text>{toThaiDateString(newsDate)}</Text>
                        </View>
                        <Image source={{ uri: item.image_url }} style={{ width: 100, height: 100, borderRadius:5 }} />
                    </View>
                );
            })}
        </View>
    );
}

function toThaiDateString(date) {
    let monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();

    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");

    return `${numOfDay} ${month} ${year} ` +
        `${hour}:${minutes}:${second} น.`;
}

const styles = StyleSheet.create({

    newscontainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 150,
    },
    news: {
        width: '85%',
        height: 150,
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 10
    },
    textContainer: {
        flex: 1,
        padding: 5,
    }
});

const textStyles = StyleSheet.create({
    newsTitle: {
        fontFamily: 'Prompt-Regular',
        fontSize: 20,
        color: 'black',
    }
})