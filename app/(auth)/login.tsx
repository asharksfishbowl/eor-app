import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Canvas,
    Text as SkiaText,
    Group,
    useFont,
} from "@shopify/react-native-skia";

import BACKGROUND_IMAGE from "../../assets/images/background.png";

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [scale, setScale] = useState(1);
    const font = useFont(require("../../assets/fonts/Silkscreen-Regular.ttf"), 32);

    const fontStyle = {
        fontSize: 24,
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setScale((prev) => (prev === 0.45 ? 0.75 : 0.45));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = (): void => {
        router.replace("/(tabs)/campaign");
    };

    const handleSSOLogin = (): void => {
        router.replace("/(tabs)/campaign");
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
                <Canvas style={{ height: 100, width: "100%" }}>
                    {font && (
                        <Group transform={[{ scaleX: scale, scaleY: scale }]}>
                            <SkiaText
                                x={0}
                                y={fontStyle.fontSize}
                                text="Welcome Back Soldier!"
                                font={font}
                                color="#0ce812"
                            />
                        </Group>
                    )}
                </Canvas>

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
                    <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#aaa"
                        style={styles.icon}
                    />
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
