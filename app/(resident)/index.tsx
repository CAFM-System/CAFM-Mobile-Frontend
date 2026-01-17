import TopBanner from "@/components/resident/TopBanner";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TicketCard from "../../components/common/TicketCard";
import CreateTicketDialog from "../../components/resident/create-ticket";
import TicketService from '../../services/ticket.service';

type Ticket = {
  id: string;
  title: string;
  status: string;
  priority?: string;
};

export default function ResidentDashboard() {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");
  const [openCreate, setOpenCreate] = useState(false);


  useFocusEffect(
  useCallback(() => {
    fetchTickets();
  }, [])
);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await TicketService.getTicket();
      setTickets(res.data.tickets);
    } catch (err) {
      console.error("Ticket fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const activeCount = tickets.filter(t =>
    ["open", "assigned", "in_progress"].includes(t.status)
  ).length;

  const resolvedCount = tickets.filter(t => t.status === "resolved").length;

  const filteredTickets = tickets.filter(ticket => {
    if (filter === "active")
      return ["open", "assigned", "in_progress"].includes(ticket.status);
    if (filter === "resolved") return ticket.status === "resolved";
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-primary">
      
      <TopBanner onCreate={() => setOpenCreate(true)} />

      <CreateTicketDialog
        visible={openCreate}
        close={() => setOpenCreate(false)}
        refresh={fetchTickets}
      />

      
      
      

       
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

      {/* Filters */}
      <View className="flex-row px-4 gap-3 mt-6">
        {["all", "active", "resolved"].map(type => (
          <Pressable
            key={type}
            onPress={() => setFilter(type as any)}
            className={`px-4 py-2 rounded-full border ${
              filter === type
                ? "bg-accent border-accent"
                : "border-secondary/30"
            }`}
          >
            <Text
              className={`font-semibold ${
                filter === type
                  ? "text-secondary"
                  : "text-secondary/70"
              }`}
            >
              {type === "all" && "All"}
              {type === "active" && "Active"}
              {type === "resolved" && "Resolved"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Ticket List */}
      <View className="flex-1 px-4 mt-4">
        {loading ? (
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
                onPress={() =>
                  router.push({
                    pathname: "/(resident)/ticketDetails",
                    params: { id: item.id },
                  })
                }
              />
            )}
          />
        )}
      </View>

    </SafeAreaView>
  );
}



function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
}) {
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
}
