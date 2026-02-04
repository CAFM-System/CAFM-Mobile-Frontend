import NotificationService from "@/services/notification.service";
import { Bell } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NotificationItem from "../../components/resident/notificationItem";

type Notification = {
  id: string;
  message: string;
  created_at: string;
  tickets?: any;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await NotificationService.getMyNotifications();
      setNotifications(res.data.notifications);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationPress = async (notification: Notification) => {
    try {
      await NotificationService.clearNotification(notification.id);
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    } catch (err) {
      console.error("Failed to clear notification", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.map((n) => NotificationService.clearNotification(n.id)),
      );
      setNotifications([]);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const unreadCount = notifications.length;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size="large" color="#F0A500" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary px-4 pt-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center gap-3">
          <View className="bg-accent/20 p-2 rounded-full">
            <Bell size={22} color="#F0A500" />
          </View>
          <Text className="text-lg font-bold text-secondary">
            Notifications
          </Text>
        </View>

        {unreadCount > 0 && (
          <Text className="text-xs bg-accent text-white px-3 py-1 rounded-full">
            {unreadCount} new
          </Text>
        )}
      </View>

      {/* Filters */}
      <View className="flex-row justify-between mb-4">
        <View className="flex-row gap-2">
          {["all", "unread"].map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-full ${
                filter === key ? "bg-secondary" : "bg-secondary/10"
              }`}
            >
              <Text
                className={`text-xs ${
                  filter === key ? "text-white" : "text-secondary"
                }`}
              >
                {key.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text className="text-xs text-accent font-semibold">Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Bell size={40} color="#334443" />
            <Text className="text-sm text-secondary mt-3">
              You're all caught up 🎉
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
      />
    </View>
  );
}
