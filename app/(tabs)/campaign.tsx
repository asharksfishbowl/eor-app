import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';

import BACKGROUND_IMAGE from "../../assets/images/map-background.png";
const { width, height } = Dimensions.get('window');

export default function CampaignScreen() {
    return (
        <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
            bounces={false}
        >
            <ImageBackground
                source={BACKGROUND_IMAGE}
                style={styles.background}
            >
                {/* Content Over the Map */}
                <View style={styles.overlayContent}>
                    <TouchableOpacity style={styles.mapMarker}>
                        <Text style={styles.markerText}>Level 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mapMarker}>
                        <Text style={styles.markerText}>Level 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mapMarker}>
                        <Text style={styles.markerText}>Boss Fight</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        width: width * 2,
        height: height,
    },
    background: {
        width: width * 2,
        height: height,
        resizeMode: 'cover',
    },
    overlayContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    mapMarker: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 15,
        borderRadius: 10,
        marginVertical: 20,
        width: 120,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    markerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
