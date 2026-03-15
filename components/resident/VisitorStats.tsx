import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Stats {
  today: number;
  onSite: number;
  preRegistered: number;
  total: number;
}

interface Props {
  stats: Stats;
}

export default function VisitorStats({ stats }: Props) {
  return (
    <View className="flex-row justify-between mb-6">
      <Stat icon="people" label="Today" value={stats.today} />
      <Stat icon="person-add" label="On Site" value={stats.onSite} />
      <Stat icon="calendar" label="Pre Reg" value={stats.preRegistered} />
    </View>
  );
}

interface StatProps {
  icon: string;
  label: string;
  value: number;
}

function Stat({ icon, label, value }: StatProps) {
  return (
    <View className="flex-1 bg-white rounded-xl p-4 mr-2 shadow">
      <Ionicons name={icon as any} size={22} color="#F0A500" />
      <Text className="text-xl font-bold mt-2">{value}</Text>
      <Text className="text-gray-500 text-xs">{label}</Text>
    </View>
  );
}
