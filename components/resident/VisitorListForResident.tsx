import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Visitor } from "../../types/visitor";
import VisitorRecordForResident from "./VisitorRecordForResident";

interface Props {
  visitors: Visitor[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function VisitorListForResident({
  visitors,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <View>
      <TextInput
        placeholder="Search visitors..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="bg-white p-3 rounded-lg mb-4"
      />

      <View className="flex-row mb-4">
        <Pressable
          onPress={() => setActiveTab("today")}
          className={`px-4 py-2 rounded-full mr-2 ${
            activeTab === "today" ? "bg-accent" : "bg-gray-200"
          }`}
        >
          <Text>Today</Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "all" ? "bg-accent" : "bg-gray-200"
          }`}
        >
          <Text>History</Text>
        </Pressable>
      </View>

      {visitors.map((visitor) => (
        <VisitorRecordForResident key={visitor.id} visitor={visitor} />
      ))}
    </View>
  );
}
