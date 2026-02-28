import React from 'react';
import {
    Alert,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import TechnicianService from '../../services/technician.service';

interface Props {
    ticketId: number;
    data: any;
    refresh: () => void;
    refreshStatus: () => void;
}

const TechnicianAction = ({
    ticketId,
    data,
    refresh,
    refreshStatus,
}: Props) => {
    const handleAcceptTask = async () => {
        try {
            await TechnicianService.startWork(ticketId);
            Alert.alert("Task accepted");
            refresh();
            refreshStatus();
        } catch (err) {
            Alert.alert("Failed to accept task");
        }
    };

    const handleResolveTask = async () => {
        try {
            await TechnicianService.resolveTickets(ticketId, data);
            Alert.alert("Task resolved");
            refresh();
            refreshStatus();
        } catch (err) {
            Alert.alert("Failed to mark task as resolved");
        }
    };

    return (
        <View className="bg-white rounded-3xl p-5 border border-secondary/10 shadow-sm">
            {data.status === "assigned" && (
                <View className="space-y-4">
                    <Text className="text-lg font-bold text-secondary">
                        Accept the task
                    </Text>

                    <View className="mt-2 flex-row justify-evenly">
                        <TouchableOpacity
                            className="w-full"
                            onPress={handleAcceptTask}
                        >
                            <Text className="text-center text-white font-semibold bg-green-500 px-4 py-2 rounded-xl">
                                Accept
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {data.status === "in_progress" && (
                <View className="space-y-4">
                    <Text className="text-lg font-bold text-secondary">
                        Mark task as resolved
                    </Text>

                    <View className="mt-2 flex-row justify-evenly">
                        <TouchableOpacity
                            className="w-full"
                            onPress={handleResolveTask}
                        >
                            <Text className="text-center text-white font-semibold bg-blue-500 px-4 py-2 rounded-xl">
                                Mark Resolved
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

export default TechnicianAction