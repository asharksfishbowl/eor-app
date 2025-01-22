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
import { useRouter } from 'expo-router';

import BACKGROUND_IMAGE from "../../assets/images/map-background.png";

const { width, height } = Dimensions.get('window');

export default function CampaignScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
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

            {/* Floating Globe Button */}
            <TouchableOpacity
                style={styles.globeButton}
                onPress={() => router.push('/(game)/map')}
            >
                <Text style={styles.globeText}>🌍</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    globeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
        elevation: 5,
    },
    globeText: {
        fontSize: 28,
        color: 'white',
    },
});
