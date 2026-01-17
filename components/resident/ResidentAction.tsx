import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import ResidentService from "../../services/resident.service";

interface Props {
  data: any;
  ticketId: number;
  sendFeedback: () => Promise<void>;
  refresh: () => void;
  onClose: () => void;
}

export function ResidentAction({
  data,
  sendFeedback,
  ticketId,
  refresh,
  onClose,
}: Props) {
  const [savedRating, setSavedRating] = useState<number | null>(null);
  const [savedReview, setSavedReview] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // 🔒 Only load rating if ticket is resolved / closed
    if (!["resolved", "closed"].includes(data.status)) {
      setSavedRating(null);
      setSavedReview(null);
      return;
    }

    const loadRating = async () => {
      try {
        const res = await ResidentService.getRatingWithFeedback(ticketId);

        if (res?.data?.rating != null) {
          setSavedRating(res.data.rating);
          setSavedReview(res.data.review ?? null);
        } else {
          setSavedRating(null);
          setSavedReview(null);
        }
      } catch (error: any) {
        // 404 / 500 → treat as "no rating yet"
        setSavedRating(null);
        setSavedReview(null);
      }
    };

    loadRating();
  }, [ticketId, reloadKey, data.status]);

  const handleCloseTicket = async () => {
    try {
      await ResidentService.closeTicket(ticketId, {
        message: data.closeComment,
      });
      Alert.alert("Success", "Ticket closed successfully");
      refresh();
      onClose();
    } catch {
      Alert.alert("Error", "Failed to close the ticket");
    }
  };

  const handleReopenTicket = async () => {
    try {
      await ResidentService.reopenTicket(ticketId, {
        message: data.reOpenComment,
      });
      Alert.alert("Success", "Ticket reopened successfully");
      refresh();
      onClose();
    } catch {
      Alert.alert("Error", "Failed to reopen the ticket");
    }
  };

  return (
    <View className="bg-white rounded-3xl p-5 border border-secondary/10 shadow-sm">
        <View className="space-y-4">

        {/* ⭐ Existing Feedback */}
        {savedRating !== null && (
            <View className="bg-green-50 border border-green-200 rounded-xl p-4">
            <Text className="text-secondary font-semibold mb-2">
                Your Feedback
            </Text>

            <View className="flex-row mb-2">
                {[1,2,3,4,5].map(i => (
                <Ionicons
                    key={i}
                    name={i <= savedRating ? "star" : "star-outline"}
                    size={20}
                    color="#F0A500"
                />
                ))}
            </View>

            {savedReview && (
                <Text className="text-secondary/70">
                {savedReview}
                </Text>
            )}
            </View>
        )}

        {/* ⭐ Rating UI */}
        {data.canRate && data.showRatingTab && (
            <View className="bg-primary border border-secondary/20 rounded-xl p-4">
            <Text className="font-semibold text-secondary mb-2">
                Rate this service
            </Text>

            <View className="flex-row mb-3">
                {[1,2,3,4,5].map(i => (
                <Pressable key={i} onPress={() => data.setRating(i)}>
                    <Ionicons
                    name={i <= data.rating ? "star" : "star-outline"}
                    size={30}
                    color="#F0A500"
                    />
                </Pressable>
                ))}
            </View>

            <TextInput
                placeholder="Additional feedback (optional)"
                value={data.feedback}
                onChangeText={data.setFeedback}
                multiline
                className="border border-secondary/20 rounded-xl px-3 py-2 mb-3 bg-white"
            />

            <View className="flex-row gap-3">
                <Pressable
                onPress={async () => {
                    await sendFeedback();
                    setSavedRating(data.rating);
                    setSavedReview(data.feedback);
                    data.setShowRatingTab(false);
                    setReloadKey(k => k + 1);
                }}
                className="flex-1 bg-accent py-3 rounded-xl items-center"
                >
                <Text className="font-bold text-secondary">
                    Submit
                </Text>
                </Pressable>

                <Pressable
                onPress={() => data.setShowRatingTab(false)}
                className="flex-1 border border-secondary/30 py-3 rounded-xl items-center"
                >
                <Text className="text-secondary">
                    Cancel
                </Text>
                </Pressable>
            </View>
            </View>
        )}

        {/* ✅ RESOLVED */}
        {data.status === "resolved" && !data.showRatingTab && (
            <>
            {savedRating === null && (
                <Pressable
                onPress={() => data.setShowRatingTab(true)}
                className="bg-accent py-3 rounded-xl items-center"
                >
                <Text className="font-bold text-secondary">
                    Rate This Service
                </Text>
                </Pressable>
            )}

            <View className="bg-green-50 border border-green-200 rounded-xl p-4">
                <TextInput
                placeholder="Add a closing comment (optional)"
                value={data.closeComment}
                onChangeText={data.setCloseComment}
                multiline
                className="border border-secondary/20 rounded-xl px-3 py-2 mb-3 bg-white"
                />

                <Pressable
                onPress={handleCloseTicket}
                className="bg-green-600 py-3 rounded-xl items-center"
                >
                <Text className="text-white font-bold">
                    Close Ticket
                </Text>
                </Pressable>
            </View>
            </>
        )}

        {/* 🔁 CLOSED */}
        {data.status === "closed" && !data.showRatingTab && (
            <View className="border rounded-xl p-4 bg-gray-50">
            <TextInput
                placeholder="Reason for reopening"
                value={data.reOpenComment}
                onChangeText={data.setReopenComment}
                multiline
                className="border border-secondary/20 rounded-xl px-3 py-2 mb-3 bg-white"
            />

            <Pressable
                onPress={handleReopenTicket}
                className="border border-secondary py-3 rounded-xl items-center"
            >
                <Text className="font-bold text-secondary">
                Reopen Ticket
                </Text>
            </Pressable>
            </View>
        )}
        </View>
    </View>
  );
}
