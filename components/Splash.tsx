import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
            <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E1E", // Dark background color for the splash screen
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 20,
    },
    spinner: {
        marginTop: 10,
    },
});
