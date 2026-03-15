import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AuthService from "../../services/auth.service";
import visitorService from "../../services/visitor.service";
import VisitorFillForm from "./VisitorFillForm";
import VisitorReviewForm from "./VisitorReviewForm";

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

interface FormData {
  apartmentNo: string;
  hostName: string;
  fullName: string;
  phone: string;
  idNumber: string;
  email: string;
  vehicleNumber: string;
  numberOfOthers: string;
  visitorType: "normal" | "regular";
  visitDate: string;
  dateFrom: string;
  dateTo: string;
}

export default function VisitorMainForm({ onCancel, onSuccess }: Props) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<FormData>({
    apartmentNo: "",
    hostName: "",
    fullName: "",
    phone: "",
    idNumber: "",
    email: "",
    vehicleNumber: "",
    numberOfOthers: "0",
    visitorType: "normal",
    visitDate: "",
    dateFrom: "",
    dateTo: "",
  });

  // Fetch resident data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AuthService.getuser();
        const user = response.data.user;

        setFormData((prev) => ({
          ...prev,
          hostName: `${user.profile.firstName} ${user.profile.lastName}`,
          apartmentNo: user.profile.apartmentNo,
        }));
      } catch (error) {
        console.error("Error fetching user for visitor form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === "vehicleNumber" || field === "idNumber") {
      setFormData((prev) => ({
        ...prev,
        [field]: value.toUpperCase(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const payload = {
    full_name: formData.fullName,
    phone: formData.phone,
    id_number: formData.idNumber,
    email: formData.email,
    vehicle_number: formData.vehicleNumber,
    visitor_type: formData.visitorType.toUpperCase(),
    valid_from: formData.dateFrom || formData.visitDate,
    valid_until: formData.dateTo || null,
    others_count: formData.numberOfOthers,
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting Invitation:", formData);

      await visitorService.preRegisterVisitor(payload);

      alert("Visitor pre-registered successfully!");

      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
    } catch (err) {
      alert("Failed to register visitor.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#F0A500" />
        <Text className="mt-3 text-gray-500">Loading visitor dashboard...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-primary">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-secondary">Invite Guest</Text>

        <Text className="text-sm text-gray-500 mt-1">
          Create a digital pass for your visitor
        </Text>

        <View className="mt-3 bg-white p-3 rounded-xl shadow-sm">
          <Text className="text-xs text-accent uppercase font-bold">
            Hosting As
          </Text>

          <Text className="font-semibold text-secondary">
            {formData.hostName} | Unit {formData.apartmentNo}
          </Text>
        </View>
      </View>

      {/* Step Indicator */}
      <View className="flex-row items-center mb-6">
        <View
          className={`h-8 w-8 rounded-full items-center justify-center ${
            step === 1 ? "bg-accent" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-bold">1</Text>
        </View>

        <View
          className={`flex-1 h-1 mx-2 ${
            step === 2 ? "bg-accent" : "bg-gray-300"
          }`}
        />

        <View
          className={`h-8 w-8 rounded-full items-center justify-center ${
            step === 2 ? "bg-accent" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-bold">2</Text>
        </View>
      </View>

      {/* Form Steps */}
      {step === 1 ? (
        <VisitorFillForm
          formData={formData}
          onChange={handleInputChange}
          onNext={() => setStep(2)}
          onCancel={onCancel}
        />
      ) : (
        <VisitorReviewForm
          formData={formData}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
        />
      )}
    </View>
  );
}
