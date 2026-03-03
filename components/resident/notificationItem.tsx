import { Clock } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { formatTimestamp } from "../../utils/time";

type Props = {
  notification: any;
  onPress: () => void;
};

export default function NotificationItem({ notification, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-secondary/10"
    >
      <View className="flex-row justify-between items-start mb-1">
        <Text className="text-sm font-semibold text-secondary flex-1">
          {notification.tickets?.title ?? "Notification"}
        </Text>
        <View className="flex-row items-center gap-1">
          <Clock size={12} color="#334443" />
          <Text className="text-[10px] text-secondary">
            {formatTimestamp(notification.created_at)}
          </Text>
        </View>
      </View>

      <Text className="text-xs text-secondary/80 mb-2">
        {notification.message}
      </Text>

      {notification.tickets && (
        <View className="flex-row flex-wrap gap-1">
          <Text className="text-[10px] text-secondary">
            {notification.tickets.location}
          </Text>
          <Text className="text-[10px] text-secondary">•</Text>
          <Text className="text-[10px] text-secondary">
            {notification.tickets.job_type}
          </Text>
        </View>
      )}

      {/* New badge */}
      <View className="mt-2 self-start">
        <Text className="text-[10px] text-accent font-semibold">● New</Text>
      </View>
    </TouchableOpacity>
  );
}
