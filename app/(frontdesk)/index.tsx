import QRScanner from "@/components/frontdesk/QRScanner";
import AuthService from "@/services/auth.service";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface User {
    profile: {
        firstName: string;
        lastName: string;
    };
}

export default function FrontDeskDashboard() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await AuthService.getuser();
                setUser(res.data.user);
            } catch (err) {
                console.error("Failed to load user", err);
            }
        };
        fetchUser();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="px-4 py-3 bg-white flex-row items-center justify-between">
                <View>
                    <Text className="text-2xl font-bold text-secondary">
                        Welcome, {user?.profile.firstName ?? "Front Desk"} 👋
                    </Text>
                    <Text className="text-secondary/70 mt-1">QR Scanner</Text>
                </View>
                <View className="h-11 w-11 rounded-xl bg-yellow-400 items-center justify-center">
                    <Ionicons name="qr-code-outline" size={24} color="#fff" />
                </View>
            </View>
            <View className="flex-1">
                <QRScanner />
            </View>
        </SafeAreaView>
    );
}
