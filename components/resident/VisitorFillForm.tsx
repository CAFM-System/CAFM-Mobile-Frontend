import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const formatDateLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateStringLocal = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getTodayStart = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeField, setActiveField] = useState<
    "visitDate" | "dateFrom" | "dateTo" | null
  >(null);
  const [tempDate, setTempDate] = useState(getTodayStart());

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate && activeField) {
      const dateString = formatDateLocal(selectedDate);
      onChange(activeField, dateString);
      setTempDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const openDatePicker = (
    field: "visitDate" | "dateFrom" | "dateTo",
    currentDate: string,
  ) => {
    setActiveField(field);
    if (currentDate) {
      setTempDate(parseDateStringLocal(currentDate));
    } else {
      setTempDate(getTodayStart());
    }
    setShowDatePicker(true);
  };

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

    const today = getTodayStart();

    if (formData.visitorType === "normal") {
      if (!formData.visitDate) {
        setErrorMsg("Please select a Visit Date.");
        return;
      }

      if (parseDateStringLocal(formData.visitDate) < today) {
        setErrorMsg("Date cannot be in the past.");
        return;
      }
    } else {
      if (!formData.dateFrom || !formData.dateTo) {
        setErrorMsg("Select both 'From' and 'To' dates.");
        return;
      }

      if (
        parseDateStringLocal(formData.dateTo) <
        parseDateStringLocal(formData.dateFrom)
      ) {
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
          autoCapitalize="characters"
          autoCorrect={false}
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
            <Pressable
              onPress={() =>
                openDatePicker("visitDate", formData.visitDate || "")
              }
              className="bg-primary p-3 rounded-xl flex-row items-center justify-between"
            >
              <Text
                className={formData.visitDate ? "text-black" : "text-gray-500"}
              >
                {formData.visitDate || "Select Visit Date"}
              </Text>
              <Calendar size={20} color="#666" />
            </Pressable>
          ) : (
            <>
              <Pressable
                onPress={() =>
                  openDatePicker("dateFrom", formData.dateFrom || "")
                }
                className="bg-primary p-3 rounded-xl flex-row items-center justify-between"
              >
                <Text
                  className={formData.dateFrom ? "text-black" : "text-gray-500"}
                >
                  {formData.dateFrom || "Select Access From Date"}
                </Text>
                <Calendar size={20} color="#666" />
              </Pressable>

              <Pressable
                onPress={() => openDatePicker("dateTo", formData.dateTo || "")}
                className="bg-primary p-3 rounded-xl flex-row items-center justify-between"
              >
                <Text
                  className={formData.dateTo ? "text-black" : "text-gray-500"}
                >
                  {formData.dateTo || "Select Access To Date"}
                </Text>
                <Calendar size={20} color="#666" />
              </Pressable>
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

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          minimumDate={getTodayStart()}
        />
      )}
    </View>
  );
}
