import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack, useSegments, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { WalletConnectProvider } from "@/contexts/WalletConnectContext";

export default function AuthChecker() {
    const { isAuthenticated } = useAuth();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // Simulate an async token/session check
        setTimeout(() => {
            setIsCheckingAuth(false);
        }, 1500);
    }, []);

    useEffect(() => {
        if (!isCheckingAuth) {
            if (!isAuthenticated && segments[0] !== "(auth)") {
                router.replace("/(auth)/login");
            } else if (isAuthenticated && segments[0] === "(auth)") {
                router.replace("/(tabs)/campaign");
            }
        }
    }, [isAuthenticated, isCheckingAuth, segments]);

    if (isCheckingAuth) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <WalletConnectProvider>
            <Stack screenOptions={{ headerShown: false }}>
                {/* The (auth) and (tabs) routes go here */}
            </Stack>
        </WalletConnectProvider>
    );
}
