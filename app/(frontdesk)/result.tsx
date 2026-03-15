import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import visitorService from '@/services/visitor.service';

export default function ResultPage() {
    const router = useRouter();
    const { scannedData } = useLocalSearchParams<{ scannedData?: string | string[] }>();

    const raw = Array.isArray(scannedData) ? scannedData[0] : scannedData ?? '';
    const [token, name, phone, email, type] = raw.split('/');

    const fields = [
        { label: 'Name', value: name },
        { label: 'Phone', value: phone },
        { label: 'Email', value: email },
        { label: 'Type', value: type },
    ];

    const handleAccept = async () => {
        try {
            await visitorService.checkOutVisitor(token);
            Alert.alert('Checked In', 'Visitor has been successfully checked in.', [
                { text: 'OK', onPress: () => router.replace('/(frontdesk)') },
            ]);
        } catch (err) {
            Alert.alert('Error', 'Visitor already checked in.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary">
            {/* Title Bar */}
            <View className="flex-row items-center px-4 py-3 bg-white border-b border-secondary/10">
                <TouchableOpacity
                    onPress={() => router.replace('/(frontdesk)')}
                    className="mr-3"
                >
                    <Ionicons name="arrow-back" size={22} color="#334443" />
                </TouchableOpacity>
                <Text className="text-secondary text-lg font-bold flex-1">Scan Result</Text>
                <View className="h-11 w-11 rounded-xl bg-yellow-400 items-center justify-center">
                    <Ionicons name="qr-code-outline" size={24} color="#fff" />
                </View>
            </View>

            <View className="flex-1 px-6 py-8 justify-center">

                <View className="bg-white rounded-2xl border border-secondary/10 overflow-hidden">
                    {fields.map(({ label, value }, i) => (
                        <View
                            key={label}
                            className={`flex-row items-center px-4 py-3 ${i < fields.length - 1 ? 'border-b border-secondary/10' : ''}`}
                        >
                            <Text className="text-secondary/60 text-sm w-16">{label}</Text>
                            <Text className="text-secondary font-medium flex-1">{value || '—'}</Text>
                        </View>
                    ))}
                </View>

                <View className="flex-row gap-3 mt-6">
                    <TouchableOpacity
                        className="flex-1 bg-accent rounded-xl py-3 items-center"
                        onPress={() => router.replace('/(frontdesk)')}
                    >
                        <Text className="text-secondary font-semibold">Scan Another</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-1 bg-green-500 rounded-xl py-3 items-center"
                        onPress={handleAccept}
                    >
                        <Text className="text-white font-semibold">Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}