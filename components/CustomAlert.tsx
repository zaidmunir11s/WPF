import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

type ModalType = {
    visible: boolean;
    onClose: () => void;
    onSaveForWorkout: () => void;
    onSaveForFuture: () => void;
}

const CustomSaveAlert = ({ visible, onClose, onSaveForWorkout, onSaveForFuture }: ModalType) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white pt-6 rounded-2xl w-10/12 max-w-md">
          <Text className="text-xl font-bold text-center">Exercises Updated</Text>
          <Text className="text-center text-gray-600 mt-2 px-2">
            Do you want to update the exercises only for this workout, or include it in future workouts too?
          </Text>

          {/* Buttons Row */}
          <View className="flex-row mt-6 border-t border-gray-300">
            <TouchableOpacity
              className="flex-1 items-center py-4 border-r border-gray-300"
              onPress={onSaveForWorkout}>
              <Text className="text-gray-700 font-semibold">This Workout Only</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center py-4" onPress={onSaveForFuture}>
              <Text className="text-black font-semibold">Save for Future</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomSaveAlert