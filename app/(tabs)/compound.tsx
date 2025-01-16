import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CompoundScreen() {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Compound Tab!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
