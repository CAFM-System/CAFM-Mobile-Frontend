import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import uploadMedia from '../../services/mediaUploader.service';
import TechnicianService from '../../services/technician.service';

type PickedFile = {
    name: string;
    uri: string;
    mimeType: string | undefined;
    size: number | undefined;
};

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
    const [resolutionComment, setResolutionComment] = useState("");
    const [attachments, setAttachments] = useState<PickedFile[]>([]);
    const [sparepartsUsed, setSparepartsUsed] = useState("");

    const handleResolveTicket = async () => {
        let promises: any[] = [];

        for (let i = 0; i < attachments.length; i++) {
            promises[i] = uploadMedia(attachments[i]);
        }

        try {
            let urls = await Promise.all(promises);

            const data = {
                message: resolutionComment,
                attachments: urls,
                sparepartsUsed: sparepartsUsed,
            }

            await TechnicianService.resolveTickets(ticketId, data);
            Alert.alert('Task resolved');
            setResolutionComment('');
            setSparepartsUsed('');
            setAttachments([]);
            refresh();
            refreshStatus();
        } catch (err) {
            Alert.alert('Failed to mark task as resolved');
        }
    };

    const handlePickFiles = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                multiple: true,
                copyToCacheDirectory: true,
            });
            if (!result.canceled) {
                const picked: PickedFile[] = result.assets.map((asset) => ({
                    name: asset.name,
                    uri: asset.uri,
                    mimeType: asset.mimeType,
                    size: asset.size,
                }));
                setAttachments((prev) => {
                    const existing = new Set(prev.map((f) => f.uri));
                    return [...prev, ...picked.filter((f) => !existing.has(f.uri))];
                });
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to pick files.');
        }
    };

    const handleRemoveFile = (uri: string) => {
        setAttachments((prev) => prev.filter((f) => f.uri !== uri));
    };

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
            const formData = new FormData();
            // Append ticket fields
            formData.append('resolutionComment', resolutionComment);
            formData.append('sparepartsUsed', sparepartsUsed);
            // Append any extra fields from data
            Object.entries(data || {}).forEach(([key, value]) => {
                if (key !== 'resolutionComment' && key !== 'sparepartsUsed') {
                    formData.append(key, String(value));
                }
            });
            // Append each file
            attachments.forEach((file) => {
                formData.append('attachments', {
                    uri: file.uri,
                    name: file.name,
                    type: file.mimeType ?? 'application/octet-stream',
                } as any);
            });
            await TechnicianService.resolveTickets(ticketId, formData);
            Alert.alert('Task resolved');
            setResolutionComment('');
            setSparepartsUsed('');
            setAttachments([]);
            refresh();
            refreshStatus();
        } catch (err) {
            Alert.alert('Failed to mark task as resolved');
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
                        Mark as resolved
                    </Text>
                    <TextInput
                        className="w-full h-24 p-3 border border-secondary/20 rounded-xl text-sm text-secondary/80"
                        placeholder="Add resolution comment..."
                        multiline
                        value={resolutionComment}
                        onChangeText={(text) => {
                            setResolutionComment(text);
                        }}
                    />

                    <Text className="text-lg font-bold text-secondary">
                        Add a list of additional spare parts if used
                    </Text>
                    <TextInput
                        className="w-full h-24 p-3 border border-secondary/20 rounded-xl text-sm text-secondary/80"
                        placeholder="List of spare parts..."
                        multiline
                        value={sparepartsUsed}
                        onChangeText={(text) => {
                            setSparepartsUsed(text);
                        }}
                    />

                    <Text className="text-lg font-bold text-secondary">
                        Attachments (Optional)
                    </Text>

                    <TouchableOpacity
                        className="border border-dashed border-secondary/30 rounded-xl p-3 items-center"
                        onPress={handlePickFiles}
                    >
                        <Text className="text-secondary/60 text-sm">＋ Pick files</Text>
                    </TouchableOpacity>

                    {attachments.length > 0 && (
                        <ScrollView className="max-h-32">
                            {attachments.map((file) => (
                                <View
                                    key={file.uri}
                                    className="flex-row items-center justify-between bg-gray-50 border border-secondary/10 rounded-lg px-3 py-2 mb-1"
                                >
                                    <Text
                                        className="text-sm text-secondary/80 flex-1 mr-2"
                                        numberOfLines={1}
                                        ellipsizeMode="middle"
                                    >
                                        {file.name}
                                    </Text>
                                    <TouchableOpacity onPress={() => handleRemoveFile(file.uri)}>
                                        <Text className="text-red-400 text-xs font-semibold">Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    )}

                    <View className="mt-2 flex-row justify-evenly">
                        <TouchableOpacity
                            className="w-full"
                            onPress={handleResolveTicket}
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