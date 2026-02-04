import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import TicketCard from "@/components/common/TicketCard";
import TicketService from "@/services/ticket.service";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

import AuthService from "@/services/auth.service";

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority?: string;
}

interface Technician {
  profile: {
    firstName: string;
    lastName: string;
  };
}

const TechnicianDashboard = () => {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");

  const [technician, setTechnician] = useState<Technician | null>(null);

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const res = await AuthService.getuser();
        setTechnician(res.data.user);
      } catch (err) {
        console.error("Failed to load technician", err);
      }
    }

    fetchTechnician();
  }, []);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const res = await TicketService.getTicket();
      setTickets(res.data.tickets);
    } catch (err) {
      console.error("Ticket fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTickets();
    }, [])
  );

  const activeCount = tickets.filter(t =>
    ["open", "assigned", "in_progress"].includes(t.status)
  ).length;

  const resolvedCount = tickets.filter(t => t.status === "resolved").length;

  const filteredTickets = tickets.filter(ticket => {
    if (filter === "active") return ["open", "assigned", "in_progress"].includes(ticket.status);
    if (filter === "resolved") return ticket.status === "resolved";
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-col">
        <Text className="text-2xl font-bold text-secondary px-4 py-3">
          Welcome back, {technician?.profile.firstName} 👋
        </Text>
        <Text className="text-secondary/70 px-4 -mt-4 mb-2">
          Maintenance Department
        </Text>
      </View>

      <View className="px-4 mt-4">
        <View className="flex-row justify-between gap-3">
          <StatCard
            title="Total"
            value={tickets.length}
            icon="list"
          />
          <StatCard
            title="Active"
            value={activeCount}
            icon="time"
          />
          <StatCard
            title="Resolved"
            value={resolvedCount}
            icon="checkmark-circle"
          />
        </View>
      </View>

      <View className="flex-row px-4 gap-3 mt-6">
        {["all", "active", "resolved"].map((status) => (
          <Pressable
            key={status}
            onPress={() => setFilter(status as "all" | "active" | "resolved")}
            className={`flex-1 py-2 rounded-lg items-center ${filter === status
              ? "bg-accent border-accent"
              : "border-secondary/30"
              }`
            }
          >
            <Text className={`font-semibold ${filter === status ? "text-secondary" : "text-secondary/70"}`}>
              {status === "all" && "All"}
              {status === "active" && "Active"}
              {status === "resolved" && "Resolved"}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-1 px-4 mt-4">
        {isLoading ? (
          <ActivityIndicator color="#334443" />
        ) : (
          <FlatList
            data={filteredTickets}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TicketCard
                ticket={item}
                onPress={() => router.push({
                  pathname: "/(technician)/ticketDetails",
                  params: { id: item.id },
                })}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default TechnicianDashboard;

interface StatCardProps {
  title: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 shadow-md border border-secondary/10">
      <Ionicons name={icon} size={22} color="#334443" />
      <Text className="text-secondary text-xl font-bold mt-2">
        {value}
      </Text>
      <Text className="text-secondary/70 text-sm">
        {title}
      </Text>
    </View>
  );
};