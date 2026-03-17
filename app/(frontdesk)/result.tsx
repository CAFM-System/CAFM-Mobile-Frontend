import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import visitorService from '@/services/visitor.service';

export default function ResultPage() {
    const router = useRouter();
    const { scannedData } = useLocalSearchParams<{ scannedData?: string | string[] }>();
    const [isAccepting, setIsAccepting] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const raw = Array.isArray(scannedData) ? scannedData[0] : scannedData ?? '';
    const [token, name, phone, email, type] = raw.split('/');

    const fields = [
        { label: 'Name', value: name },
        { label: 'Phone', value: phone },
        { label: 'Email', value: email },
        { label: 'Type', value: type },
    ];

    const openStyledAlert = (
        title: string,
        message: string,
        type: 'success' | 'error'
    ) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);
    };

    const handleAccept = async () => {
        if (isAccepting) return;

        try {
            setIsAccepting(true);
            await visitorService.checkOutVisitor(token);
            openStyledAlert('Checked In', 'Visitor has been successfully checked in.', 'success');
        } catch (err) {
            openStyledAlert('Error', 'Visitor already checked in.', 'error');
        } finally {
            setIsAccepting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <Modal
                animationType="fade"
                transparent
                visible={alertVisible}
                onRequestClose={() => setAlertVisible(false)}
            >
                <View className="flex-1 bg-black/40 items-center justify-center px-6">
                    <View className="w-full bg-white rounded-2xl p-5 border border-secondary/10">
                        <View className="items-center mb-3">
                            <View
                                className={`h-12 w-12 rounded-full items-center justify-center ${alertType === 'success' ? 'bg-green-100' : 'bg-red-100'
                                    }`}
                            >
                                <Ionicons
                                    name={alertType === 'success' ? 'checkmark' : 'close'}
                                    size={24}
                                    color={alertType === 'success' ? '#16a34a' : '#dc2626'}
                                />
                            </View>
                        </View>

                        <Text className="text-secondary text-lg font-bold text-center">{alertTitle}</Text>
                        <Text className="text-secondary/70 text-center mt-2 mb-5">{alertMessage}</Text>

                        <TouchableOpacity
                            className={`rounded-xl py-3 items-center ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            onPress={() => {
                                setAlertVisible(false);
                                if (alertType === 'success') {
                                    router.replace('/(frontdesk)');
                                }
                            }}
                        >
                            <Text className="text-white font-semibold">OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
                        className={`flex-1 rounded-xl py-3 items-center ${isAccepting ? 'bg-green-400' : 'bg-green-500'}`}
                        disabled={isAccepting}
                        onPress={handleAccept}
                    >
                        <View className="flex-row items-center justify-center">
                            {isAccepting && <ActivityIndicator size="small" color="#fff" />}
                            <Text className={`text-white font-semibold ${isAccepting ? 'ml-2' : ''}`}>
                                {isAccepting ? 'Accepting...' : 'Accept'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}