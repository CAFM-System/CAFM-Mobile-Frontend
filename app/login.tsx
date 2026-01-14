import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthService from "../services/auth.service";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      setIsLoggingIn(true);

      // 🔐 replace with your AuthService
      const res = await AuthService.login({
        email,
        password,
      });

      setIsLoggingIn(false);
      setLoginSuccess(true);

      // Hide success animation after 2s
      setTimeout(() => setLoginSuccess(false), 2000);

      // Redirect by role
      const role = res.data.user.role;
      console.log("User role:", role);
      setTimeout(() => {
        if (role === "resident") {
          router.replace("/(resident)");
        } else if (role === "technician") {
          router.replace("/(technician)");
        } else {
          console.warn("Unknown role:", role);
        }
      }, 800);


    } catch (err) {
      setIsLoggingIn(false);
       console.error("LOGIN ERROR:", err);
      alert("Login failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {/* Background Overlay */}
        <View className="absolute inset-0 bg-secondary opacity-95" />

        {/* Content */}
        <View className="flex-1 justify-center px-6">

          {/* Logo */}
          <View className="items-center mb-8">
            <Image
              source={require("../assets/images/logo_withoutBG.png")}
              className="h-24 w-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-primary text-2xl font-bold">
              Welcome Back
            </Text>
            <Text className="text-primary/70 text-sm mt-1">
              Computer Aided Facility Management
            </Text>
          </View>

          {/* Card */}
          <View className="bg-primary/90 rounded-3xl p-6 shadow-2xl">

            {/* Email */}
            <View className="mb-4">
              <Text className="text-secondary font-semibold mb-2">
                Email Address
              </Text>

              <View className="flex-row items-center bg-primary/60 rounded-xl px-4 border border-secondary/20">
                <Ionicons name="mail" size={18} color="#334443" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#33444399"
                  className="flex-1 px-3 py-3 text-secondary"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-2">
              <Text className="text-secondary font-semibold mb-2">
                Password
              </Text>

              <View className="flex-row items-center bg-primary/60 rounded-xl px-4 border border-secondary/20">
                <Ionicons name="lock-closed" size={18} color="#334443" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#33444399"
                  className="flex-1 px-3 py-3 text-secondary"
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color="#334443"
                  />
                </Pressable>
              </View>
            </View>

            {/* Forgot */}
            <Pressable
              onPress={() => router.push("/forgetPassword")}
              className="self-end mb-4"
            >
              <Text className="text-accent text-sm font-semibold">
                Forgot password?
              </Text>
            </Pressable>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoggingIn || !email || !password}
              className="bg-accent rounded-xl py-3 items-center shadow-lg"
            >
              {isLoggingIn ? (
                <ActivityIndicator color="#334443" />
              ) : (
                <View className="flex-row items-center gap-2">
                  <Text className="text-secondary font-bold text-base">
                    Login
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#334443" />
                </View>
              )}
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-secondary/20" />
              <Text className="mx-3 text-secondary/60 text-sm">
                New here?
              </Text>
              <View className="flex-1 h-px bg-secondary/20" />
            </View>

            {/* Register */}
            <Pressable
              onPress={() => router.push("/register")}
              className="border border-secondary/30 rounded-xl py-3 items-center"
            >
              <Text className="text-secondary font-semibold">
                Create Account
              </Text>
            </Pressable>

          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
