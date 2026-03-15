import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const FRAME_SIZE = width * 0.65;

// --- Scan Line ---
function ScanLine() {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, { toValue: FRAME_SIZE - 4, duration: 2000, useNativeDriver: true }),
                Animated.timing(anim, { toValue: 0, duration: 2000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: '#00FF99',
                    shadowColor: '#00FF99',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.9,
                    shadowRadius: 6,
                },
                { transform: [{ translateY: anim }] },
            ]}
        />
    );
}

// --- Corner Brackets ---
function ScanFrame() {
    const corners = [
        { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 8 },
        { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 8 },
        { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 8 },
        { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 8 },
    ];

    return (
        <View className="overflow-hidden" style={{ width: FRAME_SIZE, height: FRAME_SIZE }}>
            <ScanLine />
            {corners.map((style, i) => (
                <View
                    key={i}
                    className="absolute"
                    style={[
                        {
                            width: 30,
                            height: 30,
                            borderColor: '#00FF99',
                        },
                        style,
                    ]}
                />
            ))}
        </View>
    );
}

// --- Main Scanner ---
export default function QRScanner() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const hasNavigatedRef = useRef(false);

    useFocusEffect(
        useCallback(() => {
            hasNavigatedRef.current = false;
            return () => {
                hasNavigatedRef.current = false;
            };
        }, [])
    );

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        if (hasNavigatedRef.current) return;
        hasNavigatedRef.current = true;
        router.push({
            pathname: '/(frontdesk)/result',
            params: { scannedData: data },
        });
    };

    if (!permission?.granted) {
        return (
            <View className="flex-1 justify-center items-center p-6">
                <Text className="text-center mb-4 text-[15px]">Camera access is needed to scan QR codes.</Text>
                <TouchableOpacity className="bg-[#00FF99] py-2.5 px-7 rounded-full" onPress={requestPermission}>
                    <Text className="text-black font-bold text-sm">Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1">
            <CameraView
                style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                facing="back"
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            />

            {/* Dimmed overlay */}
            <View className="absolute inset-0">
                <View className="flex-1 bg-black/60" />
                <View className="flex-row" style={{ height: FRAME_SIZE }}>
                    <View className="flex-1 bg-black/60" />
                    <ScanFrame />
                    <View className="flex-1 bg-black/60" />
                </View>
                <View className="flex-1 bg-black/60 items-center pt-6 px-6">
                    <Text className="text-white text-sm opacity-80">Align QR code within the frame</Text>
                </View>
            </View>
        </View>
    );
}