import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultPage() {
    const router = useRouter();
    const { scannedData } = useLocalSearchParams<{ scannedData?: string | string[] }>();

    const value = Array.isArray(scannedData) ? scannedData[0] : scannedData;

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1 px-6 py-8 justify-center">
                <Text className="text-secondary text-lg font-semibold mb-2">Scanned Data</Text>
                <View className="bg-white rounded-xl p-4 border border-secondary/10">
                    <Text className="text-secondary">{value || 'No scanned data found.'}</Text>
                </View>

                <TouchableOpacity
                    className="mt-6 bg-accent rounded-xl py-3 items-center"
                    onPress={() => router.replace('/(frontdesk)')}
                >
                    <Text className="text-secondary font-semibold">Scan Another</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}