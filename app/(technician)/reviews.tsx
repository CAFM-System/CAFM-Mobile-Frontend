import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import Auth from "@/services/auth.service";
import TechnicianService from "@/services/technician.service";

const Reviews = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({
        averageRating: 0,
        totalFeedbacks: 0,
        positivePercentage: 0
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await TechnicianService.getMyReviews();
                const userRes = await Auth.getuser();
                setReviews(res.data.reviews);
                setUser(userRes.data.user);
                calculateStats(res.data.reviews);

            } catch (err) {
                console.error("Failed to load reviews", err);
            }
        };

        fetchReviews();
    }, []);

    const calculateStats = (data: any[]) => {
        if (data.length === 0) return;

        const total = data.length;
        const sumRating = data.reduce((acc, curr) => acc + (curr.rating || 0), 0);
        const avg = sumRating / total;

        const positiveCount = data.filter(r => r.rating >= 4).length;
        const positivePct = Math.round((positiveCount / total) * 100);

        setStats({
            averageRating: parseFloat(avg.toFixed(1)),
            totalFeedbacks: total,
            positivePercentage: positivePct
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-primary pt-5">

            <View className="flex-col">
                <Text className="text-2xl font-bold text-secondary px-4 py-3">
                    Welcome back, {user?.profile.firstName}👋
                </Text>
                <Text className="text-secondary/70 px-4 -mt-4 mb-2">
                    Maintenance Department
                </Text>
            </View>

            <View className="px-4 mt-4">
                <View className="flex-row justify-between gap-3">
                    <StatCard title="Avarage Rating" value={stats.averageRating} icon="star" />
                    <StatCard title="Total Feedbacks" value={stats.totalFeedbacks} icon="chatbubbles" />
                    <StatCard title="Positive Feedback" value={`${stats.positivePercentage}%`} icon="thumbs-up" />
                </View>
            </View>

            <View className="px-4 mt-6">
                <Text className="text-secondary text-lg font-bold mb-4">Recent Feedback</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                >
                    {reviews.length === 0 ? (
                        <Text className="text-secondary/50">No feedback available</Text>
                    ) : (
                        reviews.map((review, index) => (
                            <View key={index} className="bg-white rounded-3xl p-4 mb-4 shadow-md border border-secondary/10">
                                <View className="flex-row items-center justify-between mb-3">
                                    <View className="bg-secondary/5 px-3 py-1 rounded-full border border-secondary/10">
                                        <Text className="text-secondary font-semibold text-xs">#{review.tickets.ticket_id || "N/A"}</Text>
                                    </View>
                                    <View className="flex-row items-center bg-accent/25 px-3 py-1 rounded-full">
                                        <Ionicons name="star" size={14} color="#F0A500" />
                                        <Text className="text-secondary ml-1 text-xs font-semibold">{review.rating || "No rating"}</Text>
                                    </View>
                                </View>

                                <Text className="text-secondary text-base font-bold mb-2">{review.tickets.title || "No title"}</Text>

                                <View className="bg-secondary/5 rounded-xl px-3 py-2 border border-secondary/10">
                                    <Text className="text-secondary/80 text-sm">{review.tickets.complaint || "No comment provided."}</Text>
                                </View>

                                <View className="mt-3 border-l-2 border-accent pl-3">
                                    <Text className="text-secondary text-sm leading-5">{review.review || "No review provided."}</Text>
                                </View>

                                <View className="flex-row items-center mt-4 pt-3 border-t border-secondary/10 justify-between">
                                    <View className="flex-row items-center bg-primary px-2.5 py-1.5 rounded-full">
                                        <Ionicons name="person-circle-outline" size={18} color="#334443" />
                                        <Text className="text-secondary ml-1.5 text-xs font-medium">{review.tickets.resident_name || "Anonymous"}</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Ionicons name="calendar-outline" size={14} color="#334443" />
                                        <Text className="text-secondary/80 text-xs ml-1">{new Date(review.tickets.created_at).toLocaleDateString()}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

export default Reviews;

interface StatCardProps {
    title: string;
    value: string | number;
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