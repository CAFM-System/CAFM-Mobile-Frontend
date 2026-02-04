import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { CircleAlert, Clock, MapPin, User, X } from 'lucide-react-native'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    Text,
    View
} from 'react-native'

import StatusHistory from '@/components/common/StatusHistory'
import TechnicianAction from '@/components/technician/TechnicianAction'
import TicketService from '@/services/ticket.service'

const ticketDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const ticketId = typeof id === 'string' ? Number(id) : Number(id?.[0]);

    const [data, setData] = useState<any>(null);
    const [statusHistory, setStatusHistory] = useState<any[]>([]);
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);

    {/* fetch tickets */ }
    const fetchTicket = async () => {
        try {
            const res = await TicketService.getTicketById(ticketId);
            setData(res.data.ticket);
        } catch (err) {
            Alert.alert("Failed to fetch ticket details");
        } finally {
            setIsTicketLoading(false);
        }
    };

    {/* fetch status history */ }
    const fetchStatusHistory = async () => {
        try {
            const res = await TicketService.updateStatusHistory(ticketId);
            setStatusHistory(res.data || []);
        } catch (err) {
            Alert.alert("Failed to fetch status history");
        } finally {
            setIsHistoryLoading(false);
        }
    };

    useEffect(() => {
        if (!ticketId || Number.isNaN(ticketId)) {
            Alert.alert("Invalid ticket");
            router.back();
            return;
        }

        setIsTicketLoading(true);
        fetchTicket();
    }, [ticketId]);

    useFocusEffect(
        useCallback(() => {
            if (!ticketId || Number.isNaN(ticketId)) return;

            setIsHistoryLoading(true);
            fetchStatusHistory();
        }, [ticketId]),
    );

    // useEffect(() => {
    //     setStatusHistory([]);
    // }, [ticketId]);

    if (isTicketLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-primary">
                <ActivityIndicator size="large" color="#F0A500" />
            </View>
        );
    }

    // if (!data) {
    //     return (
    //         <View className="flex-1 justify-center items-center bg-primary">
    //             <Text className="text-secondary/50">No ticket data available</Text>
    //         </View>
    //     );
    // }

    const dateTime = data.created_at?.toString();
    const [date, time] = dateTime?.split('T') || ["", ""];
    const formattedTime = time ? time.split('.')[0] : "";

    return (
        <View className="flex-1 bg-primary">
            <View className="flex-row items-center px-6 py-5 bg-white border-b border-secondary/10 shadow-sm">
                <Pressable
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-primary items-center justify-center"
                >
                    <X size={20} color="#334443" />
                </Pressable>

                <Text className="ml-4 text-xl font-bold text-secondary">
                    Ticket Details
                </Text>
            </View>

            <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Ticket Info */}
                <View className="mt-6 mb-6">
                    <Text className="text-xs text-secondary/50 mb-1">
                        {data.ticket_id}
                    </Text>

                    <Text className="text-2xl font-extrabold text-secondary leading-tight mb-3">
                        {data.title}
                    </Text>

                    <Text className="text-secondary/70 leading-6">{data.complaint}</Text>
                </View>

                {/* Info Card */}
                <View className="bg-white rounded-3xl p-5 mb-8 border border-secondary/10 shadow-sm">
                    <InfoRow
                        icon={<CircleAlert size={18} color="#F0A500" />}
                        label="Category"
                        value={data.job_type}
                    />
                    <InfoRow
                        icon={<MapPin size={18} color="#F0A500" />}
                        label="Location"
                        value={data.location}
                    />
                    <InfoRow
                        icon={<User size={18} color="#F0A500" />}
                        label="Resident"
                        value={data.resident_name}
                    />
                    <InfoRow
                        icon={<Clock size={18} color="#F0A500" />}
                        label="Created"
                        value={date + "  " + formattedTime}
                    />
                </View>

                {/* Status History */}
                <View className="bg-white rounded-3xl p-5 mb-8 border border-secondary/10 shadow-sm">
                    <Text className="text-lg font-bold text-secondary mb-4">
                        Status History
                    </Text>

                    {isHistoryLoading ? (
                        <ActivityIndicator color="#F0A500" />
                    ) : (
                        <StatusHistory data={statusHistory} refresh={fetchStatusHistory} />
                    )}
                </View>

                {/* Acctions */}
                {["assigned"].includes(data.status) && (
                    <TechnicianAction />
                )}
            </ScrollView>
        </View>
    )
}

export default ticketDetails

/* ---------- Helper ---------- */

type InfoRowProps = {
    icon: ReactNode;
    label: string;
    value: string;
};

const InfoRow = ({ icon, label, value }: InfoRowProps) => {
    return (
        <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-accent/15 items-center justify-center mr-4">
                {icon}
            </View>

            <View className="flex-1">
                <Text className="text-xs text-secondary/50 mb-0.5">{label}</Text>
                <Text className="text-sm font-semibold text-secondary">{value}</Text>
            </View>
        </View>
    );
}