import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function PreviewImg({ show, setShow, img }) {
    return (
        <Modal
            transparent
            visible={show}
        >

            <View style={styles.centered}>
                <TouchableWithoutFeedback onPress={() => {
                    setShow(false)
                }} >

                <View style={styles.closeButton}>
                    <Ionicons name="close" size={15} color={'black'} />
                </View>
                </TouchableWithoutFeedback>
                <ReactNativeZoomableView
                    maxZoom={1.5}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    zoomEnabled={true}
                 
                >
                    <Image resizeMode="contain" source={{ uri: img.path }} style={[styles.previewImg, { aspectRatio: img.width / img.height }]} />
                </ReactNativeZoomableView>
            </View>

        </Modal>
    );
}

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    centered: {
        height: height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0, 0, 0)",
    },
    modalview: {
        backgroundColor: "white",
    },
    previewImg: {
        width: '100%',
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth:1,
    }
});
