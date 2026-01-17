import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import TicketCard from "@/components/common/TicketCard";
import TicketService from "@/services/ticket.service";
import { useFocusEffect, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority?: string;
}

export default function TechnicianDashboard() {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");

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

  const filteredTickets = tickets.filter(ticket => {
    if (filter === "active") return ["open", "assigned", "in_progress"].includes(ticket.status);
    if (filter === "resolved") return ticket.status === "resolved";
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-primary">

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
                onPress={() => { }}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

