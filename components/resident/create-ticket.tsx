import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import TicketService from "../../services/ticket.service";

interface Props {
  visible: boolean;
  close: () => void;
  refresh: () => void;
}

export default function CreateTicketDialog({
  visible,
  close,
  refresh,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !category || !location || !description) return;

    try {
      setLoading(true);

      await TicketService.createTicket({
        title,
        job_type: category,
        location,
        complaint: description,
        special_note: specialNote,
      });

      refresh();                       // 🔄 reload tickets
      close();                         // ❌ close modal
      router.replace("/(resident)");   // ➜ go to dashboard
    } catch (error) {
      console.error("Ticket create failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    close();
    router.replace("/(resident)");
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-end bg-black/40"
      >
        {/* Card */}
        <View className="bg-primary rounded-t-3xl p-6 max-h-[90%]">

          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-secondary text-xl font-bold">
              Create New Ticket
            </Text>

            <Pressable onPress={handleClose}>
              <Ionicons name="close" size={24} color="#334443" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Title */}
            <Field label="Title *">
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Brief description"
                placeholderTextColor="#33444380"
                className="border border-secondary/20 rounded-xl px-4 py-3 text-secondary"
              />
            </Field>

            {/* Category */}
            <Field label="Category *">
              <View className="border border-secondary/20 rounded-xl overflow-hidden">
                <Picker
                  selectedValue={category}
                  onValueChange={setCategory}
                >
                  <Picker.Item label="Select category" value="" />
                  <Picker.Item label="Cleaning" value="Cleaning" />
                  <Picker.Item label="Security" value="Security" />
                  <Picker.Item label="Electrical" value="Electrical" />
                  <Picker.Item label="Plumbing" value="Plumbing" />
                  <Picker.Item label="HVAC" value="HVAC" />
                </Picker>
              </View>
            </Field>

            {/* Location */}
            <Field label="Location *">
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Kitchen, Bedroom..."
                placeholderTextColor="#33444380"
                className="border border-secondary/20 rounded-xl px-4 py-3 text-secondary"
              />
            </Field>

            {/* Description */}
            <Field label="Description *">
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the issue"
                placeholderTextColor="#33444380"
                multiline
                numberOfLines={4}
                className="border border-secondary/20 rounded-xl px-4 py-3 text-secondary h-24"
              />
            </Field>

            {/* Special Note */}
            <Field label="Special Note (optional)">
              <TextInput
                value={specialNote}
                onChangeText={setSpecialNote}
                placeholder="Any extra details"
                placeholderTextColor="#33444380"
                multiline
                numberOfLines={3}
                className="border border-secondary/20 rounded-xl px-4 py-3 text-secondary h-20"
              />
            </Field>

            {/* Buttons */}
            <View className="flex-row gap-3 mt-6">
              <Pressable
                onPress={handleClose}
                className="flex-1 border border-secondary/30 rounded-xl py-3 items-center"
              >
                <Text className="text-secondary font-semibold">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleSubmit}
                disabled={loading}
                className="flex-1 bg-accent rounded-xl py-3 items-center"
              >
                {loading ? (
                  <ActivityIndicator color="#334443" />
                ) : (
                  <Text className="text-secondary font-bold">
                    Create Ticket
                  </Text>
                )}
              </Pressable>
            </View>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/* ---------- Reusable Field Wrapper ---------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-4">
      <Text className="text-secondary font-semibold mb-2">
        {label}
      </Text>
      {children}
    </View>
  );
}
