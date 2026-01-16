import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import AuthService from "../../services/auth.service";

type Resident = {
  profile: {
    firstName: string;
    lastName: string;
  };
};

interface Props {
  onCreate: () => void;
}

export default function TopBanner({ onCreate }: Props) {
  const [resident, setResident] = useState<Resident | null>(null);
  const [activeCount, setActiveCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthService.getuser();
        setResident(res.data.user);

        // Replace with real API later
        setActiveCount(2);
      } catch (err) {
        console.error("Failed to load resident", err);
      }
    };

    fetchData();
  }, []);

  if (!resident) {
    return (
      <View className="mx-4 mt-4 rounded-3xl bg-secondary/90 p-6">
        <ActivityIndicator color="#FCF9EA" />
      </View>
    );
  }

  return (
    <View className="mx-4 mt-4 rounded-3xl overflow-hidden">
      {/* Gradient Background */}
      <View className="absolute inset-0 bg-secondary" />
      <View className="absolute inset-0 bg-accent/20" />

      {/* Content */}
      <View className="p-6">
        <View className="flex-row items-center gap-2 mb-3">
          <Ionicons name="sparkles-outline" size={18} color="#F0A500" />
          <Text className="text-primary/80 text-sm font-semibold">
            Welcome back
          </Text>
        </View>

        <Text className="text-primary text-2xl font-extrabold">
          Hello, {resident.profile.firstName} 👋
        </Text>

        <Text className="text-primary/80 text-base mt-1">
          You have{" "}
          <Text className="font-bold text-primary">
            {activeCount}
          </Text>{" "}
          active maintenance request{activeCount !== 1 ? "s" : ""}.
        </Text>

        {/* CTA */}
        <Pressable
          onPress={onCreate}
          className="mt-5 self-start bg-primary/90 px-5 py-3 rounded-xl shadow-lg active:opacity-90"
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name="add-circle-outline" size={18} color="#334443" />
            <Text className="text-secondary font-bold">
              Create Request
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
