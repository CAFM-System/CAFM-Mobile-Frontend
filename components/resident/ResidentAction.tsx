import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
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
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isClosingTicket, setIsClosingTicket] = useState(false);
  const [isReopeningTicket, setIsReopeningTicket] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const openStyledAlert = (
    title: string,
    message: string,
    type: "success" | "error"
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

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
    if (isClosingTicket) return;

    try {
      setIsClosingTicket(true);
      await ResidentService.closeTicket(ticketId, {
        message: data.closeComment,
      });
      openStyledAlert("Success", "Ticket closed successfully", "success");
      refresh();
      onClose();
    } catch {
      openStyledAlert("Error", "Failed to close the ticket", "error");
    } finally {
      setIsClosingTicket(false);
    }
  };

  const handleReopenTicket = async () => {
    if (isReopeningTicket) return;

    try {
      setIsReopeningTicket(true);
      await ResidentService.reopenTicket(ticketId, {
        message: data.reOpenComment,
      });
      openStyledAlert("Success", "Ticket reopened successfully", "success");
      refresh();
      onClose();
    } catch {
      openStyledAlert("Error", "Failed to reopen the ticket", "error");
    } finally {
      setIsReopeningTicket(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (isSubmittingFeedback) return;

    try {
      setIsSubmittingFeedback(true);
      await sendFeedback();
      setSavedRating(data.rating);
      setSavedReview(data.feedback);
      data.setShowRatingTab(false);
      setReloadKey((k) => k + 1);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <View className="bg-white rounded-3xl p-5 border border-secondary/10 shadow-sm">
      <Modal
        animationType="fade"
        transparent
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View className="flex-1 bg-black/35 items-center justify-center px-6">
          <View className="w-full bg-white rounded-2xl p-5 border border-secondary/10">
            <View className="items-center mb-3">
              <View
                className={`h-12 w-12 rounded-full items-center justify-center ${alertType === "success" ? "bg-green-100" : "bg-red-100"
                  }`}
              >
                <Ionicons
                  name={alertType === "success" ? "checkmark" : "close"}
                  size={24}
                  color={alertType === "success" ? "#16a34a" : "#dc2626"}
                />
              </View>
            </View>

            <Text className="text-secondary text-lg font-bold text-center">{alertTitle}</Text>
            <Text className="text-secondary/70 text-center mt-2 mb-5">{alertMessage}</Text>

            <Pressable
              className={`rounded-xl py-3 items-center ${alertType === "success" ? "bg-green-600" : "bg-red-500"
                }`}
              onPress={() => setAlertVisible(false)}
            >
              <Text className="text-white font-semibold">OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View className="space-y-4">

        {/* ⭐ Existing Feedback */}
        {savedRating !== null && (
          <View className="bg-green-50 border border-green-200 rounded-xl p-4">
            <Text className="text-secondary font-semibold mb-2">
              Your Feedback
            </Text>

            <View className="flex-row mb-2">
              {[1, 2, 3, 4, 5].map(i => (
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
              {[1, 2, 3, 4, 5].map(i => (
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
                onPress={handleSubmitFeedback}
                disabled={isSubmittingFeedback}
                className={`flex-1 py-3 rounded-xl items-center justify-center flex-row ${isSubmittingFeedback ? "bg-accent/70" : "bg-accent"
                  }`}
              >
                {isSubmittingFeedback && (
                  <ActivityIndicator size="small" color="#334443" />
                )}
                <Text
                  className={`font-bold text-secondary ${isSubmittingFeedback ? "ml-2" : ""
                    }`}
                >
                  {isSubmittingFeedback ? "Submitting..." : "Submit"}
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
                disabled={isClosingTicket}
                className={`py-3 rounded-xl items-center justify-center flex-row ${isClosingTicket ? "bg-green-500/70" : "bg-green-600"}`}
              >
                {isClosingTicket && (
                  <ActivityIndicator size="small" color="#fff" />
                )}
                <Text className={`text-white font-bold ${isClosingTicket ? "ml-2" : ""}`}>
                  {isClosingTicket ? "Closing..." : "Close Ticket"}
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
              disabled={isReopeningTicket}
              className={`py-3 rounded-xl items-center justify-center flex-row ${isReopeningTicket
                  ? "border border-secondary/30 bg-secondary/10"
                  : "border border-secondary"
                }`}
            >
              {isReopeningTicket && (
                <ActivityIndicator size="small" color="#334443" />
              )}
              <Text className={`font-bold text-secondary ${isReopeningTicket ? "ml-2" : ""}`}>
                {isReopeningTicket ? "Reopening..." : "Reopen Ticket"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
