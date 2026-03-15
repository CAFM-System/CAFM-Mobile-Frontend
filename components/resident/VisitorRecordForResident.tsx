import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Visitor } from "../../types/visitor";

interface Props {
  visitor: Visitor;
}

export default function VisitorRecordForResident({ visitor }: Props) {
  const isRegular = visitor.visitorType === "regular";
  const isPreRegistered = visitor.isPreRegistered;

  const visitDate = visitor.visitDate
    ? visitor.visitDate.split("T")[0]
    : visitor.date.split("T")[0];

  return (
    <Pressable className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          {/* Avatar */}
          <View className="bg-accent h-10 w-10 rounded-full items-center justify-center mr-3">
            <Text className="text-white font-bold">
              {visitor.fullName?.charAt(0) || "V"}
            </Text>
          </View>

          <View>
            <Text className="font-semibold text-secondary text-base">
              {visitor.fullName}
            </Text>

            {/* Visitor Type */}
            <View
              className={`mt-1 px-2 py-0.5 rounded-full self-start ${
                isRegular ? "bg-purple-100" : "bg-blue-100"
              }`}
            >
              <Text
                className={`text-[10px] font-semibold ${
                  isRegular ? "text-purple-600" : "text-blue-600"
                }`}
              >
                {isRegular ? "Regular Guest" : "One-time Visit"}
              </Text>
            </View>
          </View>
        </View>

        {/* Registration Type */}
        <View
          className={`px-2 py-1 rounded-full ${
            isPreRegistered ? "bg-green-100" : "bg-orange-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              isPreRegistered ? "text-green-600" : "text-orange-600"
            }`}
          >
            {isPreRegistered ? "Pre-Registered" : "On-Site"}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View className="space-y-2">
        <View className="flex-row items-center">
          <Ionicons name="call-outline" size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-600">
            {visitor.phone || "No phone"}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="car-outline" size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-600">
            {visitor.vehicleNumber || "No vehicle"}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-600">{visitDate}</Text>
        </View>
      </View>
    </Pressable>
  );
}
