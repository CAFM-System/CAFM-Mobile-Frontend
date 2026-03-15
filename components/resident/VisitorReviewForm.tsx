import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface FormData {
  apartmentNo?: string;
  hostName?: string;
  fullName: string;
  phone: string;
  email: string;
  idNumber: string;
  vehicleNumber?: string;
  numberOfOthers?: string;
  visitorType: string;
  visitDate?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface Props {
  formData: FormData;
  onBack: () => void;
  onSubmit: () => void;
}

export default function VisitorReviewForm({
  formData,
  onBack,
  onSubmit,
}: Props) {
  const ReviewItem = ({ label, value }: { label: string; value?: string }) => (
    <View className="w-1/2 mb-4">
      <Text className="text-xs text-gray-500 uppercase mb-1">{label}</Text>
      <Text className="font-semibold text-secondary">{value || "-"}</Text>
    </View>
  );

  return (
    <View className="space-y-6">
      {/* Summary Card */}
      <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <View className="bg-accent p-2 rounded-full mr-3">
            <Ionicons name="checkmark-circle" size={20} color="white" />
          </View>

          <Text className="text-lg font-bold text-secondary">
            Visitor Summary
          </Text>
        </View>

        {/* Host Section */}
        <View className="border-b border-gray-200 pb-4 mb-4">
          <Text className="text-xs font-bold text-accent uppercase mb-3">
            Host Details
          </Text>

          <View className="flex-row flex-wrap">
            <ReviewItem label="Apartment" value={formData.apartmentNo} />
            <ReviewItem label="Resident" value={formData.hostName} />
          </View>
        </View>

        {/* Visitor Section */}
        <View className="flex-row flex-wrap">
          <ReviewItem label="Full Name" value={formData.fullName} />
          <ReviewItem label="Phone" value={formData.phone} />

          <ReviewItem label="Email" value={formData.email} />
          <ReviewItem label="ID Number" value={formData.idNumber} />

          <ReviewItem label="Vehicle No" value={formData.vehicleNumber} />
          <ReviewItem
            label="Others Count"
            value={formData.numberOfOthers || "0"}
          />

          <ReviewItem label="Visitor Type" value={formData.visitorType} />

          {formData.visitorType === "normal" ? (
            <ReviewItem label="Visit Date" value={formData.visitDate} />
          ) : (
            <>
              <ReviewItem label="Access From" value={formData.dateFrom} />
              <ReviewItem label="Access To" value={formData.dateTo} />
            </>
          )}
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between">
        <Pressable
          onPress={onBack}
          className="bg-gray-200 px-6 py-3 rounded-xl"
        >
          <Text className="text-gray-700 font-semibold">Back</Text>
        </Pressable>

        <Pressable
          onPress={onSubmit}
          className="bg-accent px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Confirm & Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
