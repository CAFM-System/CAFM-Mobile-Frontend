import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const TechnicianAction = () => {
    return (
        <View className="bg-white rounded-3xl p-5 border border-secondary/10 shadow-sm">
            <View className="space-y-4">
                <Text className="text-lg font-bold text-secondary">
                    Accept the task
                </Text>

                <View className="mt-2 flex-row justify-evenly">
                    <TouchableOpacity
                        className="w-full"
                        onPress={() => { }}
                    >
                        <Text className="text-center text-white font-semibold bg-green-500 px-4 py-2 rounded-xl">
                            Accept
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default TechnicianAction