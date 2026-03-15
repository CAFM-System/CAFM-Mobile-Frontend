import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import VisitorListForResident from "../../components/resident/VisitorListForResident";
import VisitorMainForm from "../../components/resident/VisitorMainForm";
import VisitorStats from "../../components/resident/VisitorStats";

import visitorService from "../../services/visitor.service";
import { Visitor } from "../../types/visitor";

export default function Visitors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  const getTodayStr = () => {
    const today = new Date();
    return (
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0")
    );
  };

  const getDateOnly = (date?: string) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  const fetchVisitors = async () => {
    try {
      const response = await visitorService.getVisitorInfoByResidentId();

      setVisitors(response.data);
    } catch (error) {
      console.log("Visitor fetch error:", error);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const filteredVisitors = visitors
    .filter((v) => {
      const matchesSearch =
        (v.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.idNumber || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (activeTab === "today") {
        return getDateOnly(v.visitDate) === getTodayStr();
      }

      return matchesSearch;
    })
    .sort((a, b) => {
      const dateA = a.visitDate ? new Date(a.visitDate).getTime() : 0;
      const dateB = b.visitDate ? new Date(b.visitDate).getTime() : 0;
      return dateB - dateA;
    });

  const stats = {
    today: visitors.filter((v) => getDateOnly(v.visitDate) === getTodayStr())
      .length,
    onSite: visitors.filter(
      (v) => getDateOnly(v.visitDate) === getTodayStr() && !v.isPreRegistered,
    ).length,
    preRegistered: visitors.filter(
      (v) => getDateOnly(v.visitDate) === getTodayStr() && v.isPreRegistered,
    ).length,
    total: visitors.length,
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold mb-1">Visitor Management</Text>

        <Text className="text-gray-500 mb-4">
          Monitor and manage guest visits
        </Text>

        <VisitorStats stats={stats} />

        <VisitorListForResident
          visitors={filteredVisitors}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </ScrollView>

      {/* Floating Add Button */}

      <Pressable
        onPress={() => setIsModalOpen(true)}
        className="absolute bottom-6 right-6 bg-accent p-4 rounded-full shadow-lg"
      >
        <Ionicons name="person-add" size={24} color="white" />
      </Pressable>

      {/* Modal Form */}

      <Modal visible={isModalOpen} animationType="slide">
        <VisitorMainForm
          onCancel={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchVisitors();
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}
