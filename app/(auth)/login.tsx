import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Platform,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate,
} from "react-native-reanimated";

import BACKGROUND_IMAGE from "../../assets/images/background.png";


const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const scale = useSharedValue(1);
    const animatedTitleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }], // Pulsating scale effect
    }));

    useEffect(() => {
        scale.value = withRepeat(
            withTiming(1.35, { duration: 1000 }),
            -1,
            true
        );
    }, [scale]);


    const handleLogin = (): void => {
        Alert.alert("Login", `Email: ${email}, Password: ${password}`);
    };

    const handleSSOLogin = (): void => {
        Alert.alert("SSO", "SSO Login triggered");
    };

    const handleBiometricLogin = async (): Promise<void> => {
        const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
        if (!isBiometricSupported) {
            Alert.alert(
                "Error",
                "Biometric authentication is not supported on this device"
            );
            return;
        }

        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
            Alert.alert("Error", "No biometrics found, please enable it on your device");
            return;
        }

        const { success } = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login with Biometrics",
        });

        if (success) {
            router.replace("/(tabs)/campaign");
        } else {
            Alert.alert("Error", "Authentication failed");
        }
    };

    return (
        <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
            <View style={styles.overlay}>
                <Animated.Text style={[styles.title, animatedTitleStyle]}>
                    Welcome Back Soldier!
                </Animated.Text>

                <Text style={styles.subtitle}>We need you to login and join the fight</Text>

                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Ionicons name="log-in-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.ssoButton]}
                    onPress={handleSSOLogin}
                >
                    <Ionicons name="cloud-outline" size={20} color="#fff" />
                    <Text style={styles.ssoButtonText}>Login with SSO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.fingerprintButton]}
                    onPress={handleBiometricLogin}
                >
                    <Ionicons name="finger-print" size={40} color="#007AFF" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 32, // Slightly larger for a bold presence
        fontWeight: "bold",
        color: "#e8de1d",
        marginBottom: 10,
        textTransform: "uppercase", // Make it all caps for the "military" feel
        letterSpacing: 2, // Add spacing between letters for a futuristic look
        textShadowColor: "#000000", // Red glow for the "Starship Troopers" vibe
        textShadowOffset: { width: 2, height: 2 }, // Offset for depth
        textShadowRadius: 4, // Glow effect
        fontStyle: "italic", // Slight slant for dynamic appearance
        textAlign: "center", // Centered for uniformity
        fontFamily: ""
    },
    subtitle: {
        fontSize: 16,
        color: "#ddd",
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 15,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    icon: {
        padding: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: "#333",
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        backgroundColor: "#007AFF",
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
    ssoButton: {
        backgroundColor: "#6c757d",
    },
    ssoButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },
    fingerprintButton: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#e9ecef",
    },
});

export default LoginScreen;
