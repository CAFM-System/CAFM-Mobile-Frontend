import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Ticket = {
  ticket_id?: string;
  ticket_number?: string;
  title: string;
  complaint?: string;
  description?: string;
  resident_name?: string;
  tenant_name?: string;
  job_type?: string;
  category?: string;
  priority?: string;
  status?: string;
  location?: string;
  created_at?: string;
};

interface Props {
  ticket: Ticket;
  onPress?: () => void;
}

export default function TicketCard({ ticket, onPress }: Props) {
  const id = ticket.ticket_id || ticket.ticket_number;
  const desc = ticket.complaint || ticket.description;
  const name = ticket.resident_name || ticket.tenant_name;
  const category = ticket.job_type || ticket.category;

  const status = ticket.status?.toLowerCase() || "open";
  const priority = ticket.priority?.toLowerCase() || "low";
  const dateTime = ticket.created_at?.toString();
  const [date, time] = dateTime?.split("T") || ["", ""];

  const formattedTime = time ? time.split(".")[0] : "";

  const statusStyle =
    {
      open: "bg-secondary/10",
      assigned: "bg-accent/20",
      in_progress: "bg-accent/30",
      resolved: "bg-green-200",
      closed: "bg-secondary/20",
      reopened: "bg-orange-200",
    }[status] || "bg-secondary/10";

  const priorityStyle =
    {
      low: "bg-secondary/10",
      medium: "bg-accent/20",
      high: "bg-orange-200",
      urgent: "bg-red-200",
    }[priority] || "bg-secondary/10";

  return (
    <Pressable
      onPress={onPress}
      className="bg-primary rounded-2xl p-5 mb-4 border border-secondary/10 shadow-md active:opacity-90"
    >
      {/* Header */}
      <View className="flex-row flex-wrap items-center gap-2 mb-2">
        <Text className="text-secondary font-semibold">#{id}</Text>

        <View className={`px-3 py-1 rounded-full ${statusStyle}`}>
          <Text className="text-secondary text-xs font-semibold capitalize">
            {ticket.status}
          </Text>
        </View>

        <View className={`px-3 py-1 rounded-full ${priorityStyle}`}>
          <Text className="text-secondary text-xs font-semibold capitalize">
            {ticket.priority}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text className="text-secondary text-base font-bold mb-1">
        {ticket.title}
      </Text>

      {/* Description */}
      <Text className="text-secondary/70 text-sm mb-4" numberOfLines={2}>
        {desc}
      </Text>

      {/* Footer */}
      <View className="flex-row justify-between">
        {/* Left */}
        <View className="gap-1">
          <View className="flex-row items-center gap-2">
            <Ionicons name="location-outline" size={14} color="#334443" />
            <Text className="text-secondary/70 text-xs">{ticket.location}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Ionicons name="person-outline" size={14} color="#334443" />
            <Text className="text-secondary/70 text-xs">{name}</Text>
          </View>
        </View>

        {/* Right */}
        <View className="gap-1 items-end">
          <View className="flex-row items-center gap-2">
            <Ionicons name="alert-circle-outline" size={14} color="#334443" />
            <Text className="text-secondary/70 text-xs">{category}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Ionicons name="time-outline" size={14} color="#334443" />
            <Text className="text-secondary/70 text-xs">
              {date + " "} {formattedTime}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
