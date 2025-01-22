import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#000000",
                },
                headerTitleStyle: {
                    fontFamily: "Silkscreen-Regular",
                    fontSize: 24,
                    color: "#f6f6f6",
                },
                headerTransparent: false,
                tabBarStyle: { backgroundColor: "#f6f6f6" },
                tabBarLabelStyle: { fontSize: 12, color: "#000000" },
                tabBarActiveTintColor: "#0015ff",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tabs.Screen
                name="campaign"
                options={{
                    title: "Campaign",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="globe-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="compound"
                options={{
                    title: "Compound",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="guild"
                options={{
                    title: "Guild",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
