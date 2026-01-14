import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const LandingScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <Text className="text-secondary text-2xl font-bold tracking-wide">
          MyApp
        </Text>

        <Pressable
          onPress={() => router.push("/login")}
          className="bg-accent px-5 py-2 rounded-full"
        >
          <Text className="text-secondary font-semibold text-sm">
            Login
          </Text>
        </Pressable>
      </View>

      {/* Hero Section */}
      <View className="flex-1 items-center justify-center px-6">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          }}
          style={{
            width: width * 0.9,
            height: width * 0.55,
          }}
          className="rounded-3xl mb-10"
          resizeMode="cover"
        />

        <Text className="text-secondary text-4xl font-extrabold text-center leading-tight">
          Smart Living,
          {"\n"}Simplified
        </Text>

        <Text className="text-secondary/70 text-base text-center mt-4 leading-relaxed">
          Manage services, tickets, and activities with a modern,
          simple, and reliable mobile experience.
        </Text>

        {/* CTA Buttons */}
        <View className="flex-row gap-4 mt-8">
          <Pressable
            onPress={() => router.push("/login")}
            className="bg-accent px-8 py-4 rounded-2xl shadow"
          >
            <Text className="text-secondary font-semibold text-base">
              Get Started
            </Text>
          </Pressable>

          <Pressable
            className="border border-secondary/40 px-8 py-4 rounded-2xl"
          >
            <Text className="text-secondary font-medium text-base">
              Learn More
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Feature Cards */}
      <View className="px-6 pb-10">
        <View className="flex-row gap-4">
          
          <View className="flex-1 bg-secondary/10 rounded-2xl p-4">
            <Text className="text-secondary font-semibold text-lg mb-1">
              Fast
            </Text>
            <Text className="text-secondary/70 text-sm">
              Smooth and responsive UI
            </Text>
          </View>

          <View className="flex-1 bg-secondary/10 rounded-2xl p-4">
            <Text className="text-secondary font-semibold text-lg mb-1">
              Secure
            </Text>
            <Text className="text-secondary/70 text-sm">
              Built with safety in mind
            </Text>
          </View>

          <View className="flex-1 bg-secondary/10 rounded-2xl p-4">
            <Text className="text-secondary font-semibold text-lg mb-1">
              Simple
            </Text>
            <Text className="text-secondary/70 text-sm">
              Easy for everyone
            </Text>
          </View>

        </View>
      </View>

    </SafeAreaView>
  );
};

export default LandingScreen;
