import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthService from "../../services/auth.service";

type UserProfile = {
  email?: string;
  role?: string;
  status?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    apartmentNo?: string;
    dateOfEntry?: string;
  };
};

export default function UserProfileCard() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.getuser();
      setUserData(response.data.user);
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name?: string) =>
    name ? name.charAt(0).toUpperCase() : "U";

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-3 text-secondary font-medium">
          Loading profile…
        </Text>
      </SafeAreaView>
    );
  }

  /* ===================== ERROR ===================== */
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-primary items-center justify-center px-6">
        <View className="bg-white rounded-3xl p-6 w-full max-w-md items-center shadow-xl">
          <Text className="text-5xl mb-3">⚠️</Text>
          <Text className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Profile
          </Text>
          <Text className="text-gray-600 text-center mb-5">{error}</Text>

          <Pressable
            onPress={fetchUserProfile}
            className="bg-accent px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold">Try Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  /* ===================== MAIN UI ===================== */
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 items-center justify-center px-5">
        {/* Profile Card */}
        <View className="w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden">
          {/* Gradient Header */}
          <View className="h-32 bg-accent">
            <View className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
          </View>

          {/* Content */}
          <View className="px-6 pb-10 -mt-20 items-center">
            {/* Avatar */}
            <View className="relative mb-5">
              {/* Glow */}
              <View className="absolute inset-0 bg-accent/40 rounded-full blur-2xl" />

              {/* Ring */}
              <View className="w-32 h-32 rounded-full bg-white items-center justify-center shadow-xl">
                <View className="w-28 h-28 bg-accent rounded-full items-center justify-center">
                  <Text className="text-white text-4xl font-extrabold">
                    {getInitial(userData?.profile?.firstName)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Name */}
            <Text className="text-[26px] font-extrabold text-gray-900 tracking-tight">
              {userData?.profile?.firstName} {userData?.profile?.lastName}
            </Text>

            {/* Email */}
            <Text className="text-gray-500 text-sm mt-1">
              {userData?.email}
            </Text>

            {/* Apartment Badge */}
            <View className="mt-4 bg-gray-100 px-5 py-2 rounded-full">
              <Text className="text-gray-700 font-semibold text-sm">
                Apartment {userData?.profile?.apartmentNo || "N/A"}
              </Text>
            </View>

            {/* Divider */}
            <View className="w-full h-px bg-gray-200 my-7" />

            {/* Info Cards */}
            <View className="w-full space-y-4">
              {/* Role */}
              <View className="bg-gray-50 rounded-2xl px-5 py-4 flex-row justify-between items-center shadow-sm">
                <Text className="text-gray-500 text-sm">Role</Text>
                <Text className="font-bold text-gray-900">
                  {userData?.role}
                </Text>
              </View>

              {/* Member Since */}
              <View className="bg-gray-50 rounded-2xl px-5 py-4 flex-row justify-between items-center shadow-sm">
                <Text className="text-gray-500 text-sm">Member Since</Text>
                <Text className="font-bold text-gray-900">
                  {formatDate(userData?.profile?.dateOfEntry)}
                </Text>
              </View>

              {/* Status */}
              <View className="bg-gray-50 rounded-2xl px-5 py-4 flex-row justify-between items-center shadow-sm">
                <Text className="text-gray-500 text-sm">Status</Text>

                <View
                  className={`flex-row items-center px-4 py-1.5 rounded-full ${
                    userData?.status === "Active"
                      ? "bg-green-100"
                      : "bg-gray-200"
                  }`}
                >
                  <View
                    className={`w-2.5 h-2.5 rounded-full mr-2 ${
                      userData?.status === "Active"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <Text
                    className={`font-bold text-sm ${
                      userData?.status === "Active"
                        ? "text-green-700"
                        : "text-gray-600"
                    }`}
                  >
                    {userData?.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
