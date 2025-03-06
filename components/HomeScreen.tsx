import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import CustomSaveAlert from './CustomAlert';

const styles = {
  container: 'p-4 flex-1',
  listItem: 'm-1 p-1 rounded-full border-2 relative',
  selectedItem: 'border-primary100',
  unselectedItem: 'border-white',
  image: { width: 72, height: 72, borderRadius: 36 },
  playButton:
    'absolute bottom-0 right-0 bg-primary100 rounded-full p-1.5 items-center border-2 border-white',
  removeButton: 'absolute top-0 right-1.5 bg-error100 rounded-full p-[5]',
  detailContainer: 'bg-white p-4 rounded-xl mt-5',
  titleContainer: 'flex-row justify-between items-center',
  title: 'text-lg font-bold',
  replaceButton: 'bg-primary100 px-4 py-2 rounded-full flex-row items-center gap-1',
  imageContainer: 'bg-background rounded-lg mt-2 h-[220]',
  exerciseImage: { width: '100%', height: 220, borderRadius: 8 },
  equipmentBadge:
    'flex-row items-center bg-white px-3 py-1 rounded-full mt-2 absolute bottom-[10] left-[12] border-gray60 border gap-2',
  buttonRow: 'flex-row mt-[16] gap-4',
  instructionButton: 'px-3 py-2 gap-1 rounded-full flex-row items-center border-gray100',
  editModeContainer:
    'px-2 py-2 mb-4 flex-row justify-between bg-white rounded-full shadow-md gap-4 mx-4',
  discardButton: 'bg-gray-200 px-6 py-4 rounded-full flex-1 items-center',
  saveButton: 'bg-primary100 px-6 py-4 rounded-full flex-1 items-center',
  plusButton:
    'm-1 p-4 rounded-full border-2 border-white flex items-center justify-center bg-white',
  bw: { borderWidth: 1 },
};

const exerciseData = [
  {
    name: 'Squat',
    gif_asset_url:
      'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.gif',
    equipment: 'barbell',
  },
  {
    name: 'Inclined Bench Press',
    gif_asset_url:
      'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.gif',
    equipment: 'dumbbell',
  },
  {
    name: 'Pull Ups',
    gif_asset_url:
      'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.gif',
    equipment: 'bodyweight',
  },
  {
    name: 'Shoulder Press',
    gif_asset_url:
      'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.gif',
    equipment: 'dumbbell',
  },
];

export default function HomeScreen() {
  const [exercises, setExercises] = useState(exerciseData);
  const [selectedExercise, setSelectedExercise] = useState(exerciseData[0]);
  const [editMode, setEditMode] = useState(false);
  const [originalExercises, setOriginalExercises] = useState([...exerciseData]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({ Squat: true });

  const handleSaveChanges = () => {
    setShowSaveModal(true);
  };

  const handleSaveForWorkout = () => {
    setOriginalExercises([...exercises]);
    setEditMode(false);
    setShowSaveModal(false);
  };

  const handleSaveForFuture = () => {
    setOriginalExercises([...exercises]);
    setEditMode(false);
    setShowSaveModal(false);
    // Implement logic to save for future workouts
  };

  const handleDiscardChanges = () => {
    setExercises([...originalExercises]);
    setEditMode(false);
  };

  const handleAddExercise = () => {
    alert('Add new exercise');
  };

  const handleRemoveExercise = (exerciseName) => {
    const updatedExercises = exercises.filter((exercise) => exercise.name !== exerciseName);
    setExercises(updatedExercises);

    // If we're removing the selected exercise, select another one
    if (selectedExercise.name === exerciseName && updatedExercises.length > 0) {
      setSelectedExercise(updatedExercises[0]);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-background">
      <View className={styles.container}>
        <DraggableFlatList
          data={[...exercises, { name: 'plus_button' }]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          onDragEnd={({ data }) => setExercises(data.filter((item) => item.name !== 'plus_button'))}
          renderItem={({ item, drag }) =>
            item.name === 'plus_button' ? (
              <TouchableOpacity
                className={`${styles.listItem} ${
                  selectedExercise.name === item.name ? styles.selectedItem : styles.unselectedItem
                }`}
                onPress={handleAddExercise}>
                <View style={styles.image} className="items-center justify-center bg-white">
                  <Image
                    source={require('../assets/icons/plus.svg')}
                    style={{ height: 20, width: 20 }}
                    cachePolicy={'memory'}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity
                  className={`${styles.listItem} ${
                    selectedExercise.name === item.name
                      ? styles.selectedItem
                      : styles.unselectedItem
                  }`}
                  onPress={() => setSelectedExercise(item)}
                  onLongPress={editMode ? drag : () => setEditMode(true)}>
                  <Image
                    source={{ uri: item.gif_asset_url }}
                    style={styles.image}
                    cachePolicy={'memory'}
                  />

                  {/* Play icon for selected exercise */}
                  {selectedExercise.name === item.name && (
                    <View className={styles.playButton}>
                      <Image
                        source={require('../assets/icons/play.svg')}
                        style={{ height: 8, width: 8 }}
                      />
                    </View>
                  )}

                  {completedExercises[item.name] && (
                    <View className={styles.playButton}>
                      <AntDesign name="check" size={10} color="black" />
                    </View>
                  )}
                </TouchableOpacity>

                {/* Remove button in edit mode */}
                {editMode && (
                  <TouchableOpacity
                    className={styles.removeButton}
                    onPress={() => handleRemoveExercise(item.name)}>
                    <Image
                      source={require('../assets/icons/minus.svg')}
                      style={{ height: 10, width: 10 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )
          }
        />

        <View className={styles.detailContainer}>
          <View className={styles.titleContainer}>
            <Text className={styles.title}>{selectedExercise.name}</Text>
            <TouchableOpacity className={styles.replaceButton}>
              <Image
                source={require('../assets/icons/arrows-right-left.svg')}
                style={{ height: 16, width: 16 }}
              />
              <Text>Replace</Text>
            </TouchableOpacity>
          </View>

          <View className={styles.imageContainer}>
            <Image
              source={{ uri: selectedExercise.gif_asset_url }}
              style={styles.exerciseImage}
              contentFit="contain"
              cachePolicy={'memory'}
            />

            <View className={styles.equipmentBadge}>
              <Image
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/7947/582b/21882596e62ff6584279e66f9a1ad34a?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HE89NQtVk4JeORwrwjPg-cHjLULmYz4AZ6q3ry~tfXKpR8rOQp4ITBFOsmv1FJoIxKYxeJSHnVhNXCRMYd1nzZdoGnLRk5QjsgNP7-czjkZYtwXy3VQBzlfbHUVh6vDiNgwqBMwByLtUZB7LjpM-AsXXQSYSv84fZqtfVD119p92KJvMHTwnE1Gd6~KLI8hgqUV8u~q0GqbbKhii2GHSqpOJnzoRsA0uyQdElsYroe9RmQ2TebE9fmueW3IdPIaXZbWgBwZDxocQeJ2Jkm~mZpo-cYYTVNCE7buFIxWMTpZmtI2Hicn9ogq-CS3JXvTm4UYIaCxrj6SED9bVnzNjhQ__',
                }}
                style={{ height: 16, width: 16, transform: [{ rotate: '180deg' }] }}
                cachePolicy={'memory'}
              />
              <Text>{selectedExercise.equipment}</Text>
            </View>
          </View>

          <View className={styles.buttonRow}>
            <TouchableOpacity className={styles.instructionButton} style={styles.bw}>
              <Image
                source={require('../assets/icons/document-chart-bar.svg')}
                style={{ height: 16, width: 16 }}
                cachePolicy={'memory'}
              />
              <Text>Instructions</Text>
            </TouchableOpacity>
            <TouchableOpacity className={styles.instructionButton} style={styles.bw}>
              <Image
                source={require('../assets/icons/run.svg')}
                style={{ height: 16, width: 16 }}
                cachePolicy={'memory'}
              />
              <Text>Warm Up</Text>
            </TouchableOpacity>
            <TouchableOpacity className={styles.instructionButton} style={styles.bw}>
              <Image
                source={require('../assets/icons/question-mark-circle.svg')}
                style={{ height: 16, width: 16 }}
                cachePolicy={'memory'}
              />
              <Text>FAQ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {editMode && (
        <View className={styles.editModeContainer}>
          <TouchableOpacity className={styles.discardButton} onPress={handleDiscardChanges}>
            <Text>Discard</Text>
          </TouchableOpacity>

          <TouchableOpacity className={styles.saveButton} onPress={handleSaveChanges}>
            <Text>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}

      <CustomSaveAlert
        visible={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSaveForWorkout={handleSaveForWorkout}
        onSaveForFuture={handleSaveForFuture}
      />
    </GestureHandlerRootView>
  );
}

// import React, { useState, useRef } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Image } from 'expo-image';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
// import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
// import { useQuery } from '@tanstack/react-query';
// import BottomSheet from '@gorhom/bottom-sheet';
// import axios from 'axios';

// // Types
// export interface Exercise {
//   id?: string;
//   name: string;
//   gif_asset_url: string;
//   equipment: string;
// }

// interface PlusButtonItem {
//   name: 'plus_button';
//   isPlaceholder: true;
// }

// type ExerciseListItem = Exercise | PlusButtonItem;

// // Styles
// const styles = {
//   container: 'p-4 flex-1',
//   listItem: 'm-1 p-1 rounded-full border-2 relative',
//   selectedItem: 'border-primary100',
//   unselectedItem: 'border-white',
//   image: { width: 72, height: 72, borderRadius: 36 },
//   playButton:
//     'absolute bottom-0 right-0 bg-primary100 rounded-full p-1.5 items-center border-2 border-white',
//   removeButton: 'absolute top-0 right-1.5 bg-error100 rounded-full p-[5]',
//   detailContainer: 'bg-white p-4 rounded-xl mt-5',
//   titleContainer: 'flex-row justify-between items-center',
//   title: 'text-lg font-bold',
//   replaceButton: 'bg-primary100 px-4 py-2 rounded-full flex-row items-center gap-1',
//   imageContainer: 'bg-background rounded-lg mt-2 h-[220]',
//   exerciseImage: { width: '100%', height: 220, borderRadius: 8 },
//   equipmentBadge:
//     'flex-row items-center bg-white px-3 py-1 rounded-full mt-2 absolute bottom-[10] left-[12] border-gray60 border-2',
//   buttonRow: 'flex-row justify-between mt-[16]',
//   instructionButton: 'px-4 py-2 rounded-full flex-row items-center border-2 border-gray100',
//   editModeContainer:
//     'px-2 py-2 mb-4 flex-row justify-between bg-white rounded-full shadow-md gap-4 mx-4',
//   discardButton: 'bg-gray-200 px-6 py-4 rounded-full flex-1 items-center',
//   saveButton: 'bg-primary100 px-6 py-4 rounded-full flex-1 items-center',
//   plusButton:
//     'm-1 p-4 rounded-full border-2 border-white flex items-center justify-center bg-white',
//   bottomSheetContent: 'p-4',
//   bottomSheetTitle: 'text-xl font-bold mb-4',
//   exerciseItem: 'flex-row items-center p-3 border-b border-gray-200',
//   exerciseName: 'ml-3 text-base',
//   loadingText: 'text-center py-4',
//   errorText: 'text-center py-4 text-error100',
// };

// // Mock data
// const exerciseData: Exercise[] = [
//   {
//     name: 'Squat',
//     gif_asset_url:
//       'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.gif',
//     equipment: 'barbell',
//   },
//   {
//     name: 'Inclined Bench Press',
//     gif_asset_url:
//       'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.gif',
//     equipment: 'dumbbell',
//   },
//   {
//     name: 'Pull Ups',
//     gif_asset_url:
//       'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.gif',
//     equipment: 'bodyweight',
//   },
//   {
//     name: 'Shoulder Press',
//     gif_asset_url:
//       'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.gif',
//     equipment: 'dumbbell',
//   },
// ];

// // API
// const fetchExercises = async (): Promise<Exercise[]> => {
//   const response = await axios.get('https://api-dev.wpfcoaching.de/workout-planner/exercises?lang=ENG');
//   return response.data;
// };

// // Components
// const PlusButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
//   <TouchableOpacity className={styles.plusButton} onPress={onPress}>
//     <AntDesign name="plus" size={12} color="black" />
//   </TouchableOpacity>
// );

// const ExerciseListItem: React.FC<{
//   exercise: Exercise;
//   isSelected: boolean;
//   editMode: boolean;
//   onPress: () => void;
//   onLongPress: () => void;
//   onRemove: () => void;
//   drag: () => void;
// }> = ({ exercise, isSelected, editMode, onPress, onLongPress, onRemove, drag }) => (
//   <View>
//     <TouchableOpacity
//       className={`${styles.listItem} ${isSelected ? styles.selectedItem : styles.unselectedItem}`}
//       onPress={onPress}
//       onLongPress={editMode ? drag : onLongPress}
//     >
//       <Image
//         source={{ uri: exercise.gif_asset_url }}
//         style={styles.image}
//         cachePolicy="memory"
//       />

//       {isSelected && (
//         <View className={styles.playButton}>
//           <Image
//             source={require('../assets/icons/play.svg')}
//             style={{ height: 8, width: 8 }}
//           />
//         </View>
//       )}
//     </TouchableOpacity>

//     {editMode && (
//       <TouchableOpacity className={styles.removeButton} onPress={onRemove}>
//         <Image
//           source={require('../assets/icons/minus.svg')}
//           style={{ height: 10, width: 10 }}
//         />
//       </TouchableOpacity>
//     )}
//   </View>
// );

// const ExerciseDetails: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
//   <View className={styles.detailContainer}>
//     <View className={styles.titleContainer}>
//       <Text className={styles.title}>{exercise.name}</Text>
//       <TouchableOpacity className={styles.replaceButton}>
//         <Image
//           source={require('../assets/icons/arrows-right-left.svg')}
//           style={{ height: 16, width: 16 }}
//         />
//         <Text>Replace</Text>
//       </TouchableOpacity>
//     </View>

//     <View className={styles.imageContainer}>
//       <Image
//         source={{ uri: exercise.gif_asset_url }}
//         style={styles.exerciseImage}
//         contentFit="contain"
//         cachePolicy="memory"
//       />

//       <View className={styles.equipmentBadge}>
//         <FontAwesome5 name="dumbbell" size={14} color="black" style={{ marginRight: 6 }} />
//         <Text>{exercise.equipment}</Text>
//       </View>
//     </View>

//     <View className={styles.buttonRow}>
//       <TouchableOpacity className={styles.instructionButton}>
//         <AntDesign name="book" size={18} color="black" style={{ marginRight: 4 }} />
//         <Text>Instructions</Text>
//       </TouchableOpacity>
//       <TouchableOpacity className={styles.instructionButton}>
//         <FontAwesome5 name="running" size={18} color="black" style={{ marginRight: 4 }} />
//         <Text>Warm Up</Text>
//       </TouchableOpacity>
//       <TouchableOpacity className={styles.instructionButton}>
//         <AntDesign name="questioncircleo" size={18} color="black" style={{ marginRight: 4 }} />
//         <Text>FAQ</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// const EditModeControls: React.FC<{
//   onSave: () => void;
//   onDiscard: () => void;
// }> = ({ onSave, onDiscard }) => (
//   <View className={styles.editModeContainer}>
//     <TouchableOpacity className={styles.discardButton} onPress={onDiscard}>
//       <Text>Discard</Text>
//     </TouchableOpacity>
//     <TouchableOpacity className={styles.saveButton} onPress={onSave}>
//       <Text>Save Changes</Text>
//     </TouchableOpacity>
//   </View>
// );

// const ExerciseBottomSheet: React.FC<{
//   bottomSheetRef: React.RefObject<BottomSheet>;
//   onSelectExercise: (exercise: Exercise) => void;
// }> = ({ bottomSheetRef, onSelectExercise }) => {
//   const { data, isLoading, error } = useQuery<Exercise[]>({
//     queryKey: ['exercises'],
//     queryFn: fetchExercises,
//   });

//   const snapPoints = React.useMemo(() => ['50%', '75%'], []);

//   return (
//     <BottomSheet
//       ref={bottomSheetRef}
//       index={-1}
//       snapPoints={snapPoints}
//       enablePanDownToClose
//     >
//       <View className={styles.bottomSheetContent}>
//         <Text className={styles.bottomSheetTitle}>Select Exercise</Text>

//         {isLoading && <Text className={styles.loadingText}>Loading exercises...</Text>}

//         {error && (
//           <Text className={styles.errorText}>Error loading exercises. Please try again.</Text>
//         )}

//         {data && data.map((exercise) => (
//           <TouchableOpacity
//             key={exercise.id || exercise.name}
//             className={styles.exerciseItem}
//             onPress={() => {
//               onSelectExercise(exercise);
//               bottomSheetRef.current?.close();
//             }}
//           >
//             <Image
//               source={{ uri: exercise.gif_asset_url }}
//               style={{ width: 50, height: 50, borderRadius: 25 }}
//             />
//             <Text className={styles.exerciseName}>{exercise.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </BottomSheet>
//   );
// };

// // Main Component
// export default function HomeScreen() {
//   const [exercises, setExercises] = useState<Exercise[]>(exerciseData);
//   const [selectedExercise, setSelectedExercise] = useState<Exercise>(exerciseData[0]);
//   const [editMode, setEditMode] = useState<boolean>(false);
//   const [originalExercises, setOriginalExercises] = useState<Exercise[]>([...exerciseData]);

//   const bottomSheetRef = useRef<BottomSheet>(null);

//   const handleSaveChanges = () => {
//     setOriginalExercises([...exercises]);
//     setEditMode(false);
//   };

//   const handleDiscardChanges = () => {
//     setExercises([...originalExercises]);
//     setEditMode(false);
//   };

//   const handleAddExercise = () => {
//     bottomSheetRef.current?.expand();
//   };

//   const handleRemoveExercise = (exerciseName: string) => {
//     const updatedExercises = exercises.filter((exercise) => exercise.name !== exerciseName);
//     setExercises(updatedExercises);

//     // If we're removing the selected exercise, select another one
//     if (selectedExercise.name === exerciseName && updatedExercises.length > 0) {
//       setSelectedExercise(updatedExercises[0]);
//     }
//   };

//   const handleSelectExerciseFromBottomSheet = (exercise: Exercise) => {
//     setExercises([...exercises, exercise]);
//     setSelectedExercise(exercise);
//   };

//   // Create a data array with exercises and a non-draggable plus button at the end
//   const renderItem = ({ item, drag }: RenderItemParams<ExerciseListItem>) => {
//     if ('isPlaceholder' in item) {
//       return <PlusButton onPress={handleAddExercise} />;
//     }
// console.log(selectedExercise.name)
//     return (
//       <ExerciseListItem
//         exercise={item}
//         isSelected={selectedExercise.name === item.name}
//         editMode={editMode}
//         onPress={() => setSelectedExercise(item)}
//         onLongPress={() => setEditMode(true)}
//         onRemove={() => handleRemoveExercise(item.name)}
//         drag={drag}
//         key={item.id}
//       />
//     );
//   };

//   // Create a list with data items (draggable) and non-draggable plus button
//   const listData: ExerciseListItem[] = [
//     ...exercises,
//     { name: 'plus_button', isPlaceholder: true }
//   ];

//   return (
//     <GestureHandlerRootView className="flex-1 bg-background">
//       <View className={styles.container}>
//         <DraggableFlatList
//           data={listData}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(item) => item.name}
//           onDragEnd={({ data }) => {
//             // Filter out the plus button and cast to Exercise[]
//             const newExercises = data
//               .filter((item): item is Exercise => !('isPlaceholder' in item))
//               .map(item => item as Exercise);
//             setExercises(newExercises);
//           }}
//           renderItem={renderItem}
//           // Disable drag for plus button
//           dragItemOverflow={true}
//         />

//         {selectedExercise && <ExerciseDetails exercise={selectedExercise} />}
//       </View>

//       {editMode && (
//         <EditModeControls onSave={handleSaveChanges} onDiscard={handleDiscardChanges} />
//       )}

//       <ExerciseBottomSheet
//         bottomSheetRef={bottomSheetRef}
//         onSelectExercise={handleSelectExerciseFromBottomSheet}
//       />
//     </GestureHandlerRootView>
//   );
// }
