import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
  data: any[];
  refresh?: () => void;
}

export default function StatusHistory({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <View className="items-center py-6">
        <Text className="text-secondary/60 text-sm">
          No status history available
        </Text>
      </View>
    );
  }

  return (
    <View className="space-y-5">
      {data.map((item, index) => (
        <View key={index} className="flex-row">
          {/* Timeline column */}
          <View className="items-center mr-4">
            <View className="w-3 h-3 rounded-full bg-accent mt-1" />
            {index !== data.length - 1 && (
              <View className="flex-1 w-[1px] bg-secondary/20 mt-1" />
            )}
          </View>

          {/* Card */}
          <View className="flex-1 bg-primary rounded-2xl p-4 border border-secondary/10 shadow-sm">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-secondary font-bold text-sm">
                {item.status.replace("_", " ").toUpperCase()}
              </Text>

              <Text className="text-secondary/50 text-xs">
                {item.created_at}
              </Text>
            </View>

            {item.message && (
              <Text className="text-secondary/80 text-sm leading-5 mt-1">
                {item.message}
              </Text>
            )}

            {item.updated_by && (
              <View className="flex-row items-center mt-2">
                <Ionicons
                  name="person-circle-outline"
                  size={14}
                  color="#334443"
                  style={{ marginRight: 4 }}
                />
                <Text className="text-secondary/60 text-xs">
                  {item.updated_by}
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
