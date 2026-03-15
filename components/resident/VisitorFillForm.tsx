import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const getTodayString = () => new Date().toISOString().split("T")[0];

interface FormData {
  fullName: string;
  phone: string;
  idNumber: string;
  email: string;
  vehicleNumber?: string;
  numberOfOthers: string;
  visitorType: "normal" | "regular";
  visitDate?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface Props {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onCancel: () => void;
}

export default function VisitorFillForm({
  formData,
  onChange,
  onNext,
  onCancel,
}: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateAndNext = () => {
    setErrorMsg(null);

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.idNumber ||
      !formData.email
    ) {
      setErrorMsg(
        "Required fields missing:\n• Full Name\n• Phone Number\n• ID Number\n• Email Address",
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Invalid Email Address.");
      return;
    }

    const nicRegex = /^([0-9]{9}[VvXx]|[0-9]{12})$/;
    if (!nicRegex.test(formData.idNumber)) {
      setErrorMsg("Invalid ID Number.");
      return;
    }

    const simpleSlPhoneRegex = /^(\+94|0)[0-9]{9}$/;
    if (!simpleSlPhoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      setErrorMsg("Invalid Phone Number.");
      return;
    }

    if (formData.vehicleNumber && formData.vehicleNumber.trim() !== "") {
      const basicVehicleRegex = /^([A-Z0-9\s]{1,8})[-]([0-9]{4})$/;
      if (!basicVehicleRegex.test(formData.vehicleNumber.toUpperCase())) {
        setErrorMsg("Invalid Vehicle Number.");
        return;
      }
    }

    const today = new Date(getTodayString());

    if (formData.visitorType === "normal") {
      if (!formData.visitDate) {
        setErrorMsg("Please select a Visit Date.");
        return;
      }

      if (new Date(formData.visitDate) < today) {
        setErrorMsg("Date cannot be in the past.");
        return;
      }
    } else {
      if (!formData.dateFrom || !formData.dateTo) {
        setErrorMsg("Select both 'From' and 'To' dates.");
        return;
      }

      if (new Date(formData.dateTo) < new Date(formData.dateFrom)) {
        setErrorMsg("'To' date cannot be before 'From'.");
        return;
      }
    }

    onNext();
  };

  return (
    <View className="space-y-6">
      {/* Error */}
      {errorMsg && (
        <View className="bg-red-100 border border-red-300 p-4 rounded-xl">
          <Text className="text-red-700 font-medium">{errorMsg}</Text>
        </View>
      )}

      {/* Personal Info Card */}
      <View className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <Text className="text-lg font-bold text-secondary">
          Visitor Details
        </Text>

        <View>
          <Text className="text-xs text-gray-500 mb-1">Full Name</Text>
          <TextInput
            placeholder="John Doe"
            value={formData.fullName}
            onChangeText={(v) => onChange("fullName", v)}
            className="bg-primary p-3 rounded-xl"
          />
        </View>

        <View>
          <Text className="text-xs text-gray-500 mb-1">Phone Number</Text>
          <TextInput
            placeholder="0771234567"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(v) => onChange("phone", v)}
            className="bg-primary p-3 rounded-xl"
          />
        </View>

        <View>
          <Text className="text-xs text-gray-500 mb-1">NIC / Passport</Text>
          <TextInput
            placeholder="851234567V"
            value={formData.idNumber}
            onChangeText={(v) => onChange("idNumber", v)}
            className="bg-primary p-3 rounded-xl"
          />
        </View>

        <View>
          <Text className="text-xs text-gray-500 mb-1">Email</Text>
          <TextInput
            placeholder="visitor@mail.com"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(v) => onChange("email", v)}
            className="bg-primary p-3 rounded-xl"
          />
        </View>
      </View>

      {/* Logistics Card */}
      <View className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <Text className="text-lg font-bold text-secondary">
          Visit Logistics
        </Text>

        <TextInput
          placeholder="Vehicle Number (WP CAA-1234)"
          value={formData.vehicleNumber}
          onChangeText={(v) => onChange("vehicleNumber", v)}
          className="bg-primary p-3 rounded-xl"
        />

        <TextInput
          placeholder="Number of Accompanying Persons"
          keyboardType="numeric"
          value={formData.numberOfOthers}
          onChangeText={(v) => onChange("numberOfOthers", v)}
          className="bg-primary p-3 rounded-xl"
        />
      </View>

      {/* Visitor Type */}
      <View className="bg-white rounded-2xl p-5 shadow-sm">
        <Text className="text-lg font-bold text-secondary mb-4">
          Entry Permission
        </Text>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => onChange("visitorType", "normal")}
            className={`flex-1 p-3 rounded-xl items-center ${
              formData.visitorType === "normal" ? "bg-accent" : "bg-gray-200"
            }`}
          >
            <Text
              className={`font-semibold ${
                formData.visitorType === "normal"
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              Single Visit
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onChange("visitorType", "regular")}
            className={`flex-1 p-3 rounded-xl items-center ${
              formData.visitorType === "regular" ? "bg-accent" : "bg-gray-200"
            }`}
          >
            <Text
              className={`font-semibold ${
                formData.visitorType === "regular"
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              Frequent Guest
            </Text>
          </Pressable>
        </View>

        <View className="mt-4 space-y-3">
          {formData.visitorType === "normal" ? (
            <TextInput
              placeholder="Visit Date (YYYY-MM-DD)"
              value={formData.visitDate}
              onChangeText={(v) => onChange("visitDate", v)}
              className="bg-primary p-3 rounded-xl"
            />
          ) : (
            <>
              <TextInput
                placeholder="Access From"
                value={formData.dateFrom}
                onChangeText={(v) => onChange("dateFrom", v)}
                className="bg-primary p-3 rounded-xl"
              />

              <TextInput
                placeholder="Access To"
                value={formData.dateTo}
                onChangeText={(v) => onChange("dateTo", v)}
                className="bg-primary p-3 rounded-xl"
              />
            </>
          )}
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between mt-4">
        <Pressable
          onPress={onCancel}
          className="bg-gray-200 px-6 py-3 rounded-xl"
        >
          <Text className="text-gray-700 font-medium">Cancel</Text>
        </Pressable>

        <Pressable
          onPress={validateAndNext}
          className="bg-accent px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
