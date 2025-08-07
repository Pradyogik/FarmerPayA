import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MicIcon from '../../../assets/images/mic.svg';
import BackArrow from '../../../assets/images/back-arrow.svg';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';

const activities = [
  { id: '1', title: 'Crop Farming', image: require('../../../assets/images/selection/crop-farming.jpg') },
  { id: '2', title: 'Horticulture Farming', image: require('../../../assets/images/selection/horticulture-farming.jpg') },
  { id: '3', title: 'Spice Farming', image: require('../../../assets/images/selection/spices.jpg') },
  { id: '4', title: 'Fruit Orchard Owner', image: require('../../../assets/images/selection/fruit-orchard.jpg') },
];

export default function SecondaryRoleScreen({ navigation,route }: any) {
  const { user_id } = route.params;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError]= useState('');
  const renderItem = ({ item }: any) => {
    const isSelected = selectedId === item.id;
    return (
      <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedId(item.id)}
            >
            <View style={[ styles.imageContainer,
              selectedId === item.id && styles.selectedImageBorder,
          ]}
        >
          <Image source={item.image} style={styles.image} />
        </View>
      
        <Text style={styles.cardText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  const handleSecondaryRole = async() =>{
    const selectedRole = activities.find((role) => role.id === selectedId);
    if (!selectedRole){
      console.error('Please select an activity');
      setError('Please select an activity');
      return;
    }
    setError('');
    const formattedRole = selectedRole.title;

    try{
      const response = await axios.post(
      `${BASE_URL}/farmer/${user_id}/secondary-role`,
      {
        user_id,
        secondary_role: formattedRole,
      }
    );
    console.log('Secondary role saved successfully:', response.data);
    if (formattedRole.includes('Crop')) {
      navigation.navigate('CropPlantSelection', { user_id });
    } else if (formattedRole.includes('Horticulture')) {
      navigation.navigate('HorticulturePlantSelection', { user_id });
    } else if (formattedRole.includes('Spice')) {
      navigation.navigate('SpicePlantSelection', { user_id });
    } else if (formattedRole.includes('Fruit')) {
      navigation.navigate('FruitPlantSelection', { user_id });
    } else {
      navigation.navigate('PlantSelection', { user_id }); // fallback (optional)
    }

    }catch (error: any) {
      console.error('Error saving secondary role (frontend catch):', {
        message: error?.response?.data?.message,
        full: error?.response,
      });

      setError(
        error?.response?.data?.message || 'Failed to save secondary role. Try again.'
      );
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity  onPress={() => navigation.goBack()} style={{ marginBottom: 32 }}>
        <BackArrow color="#54219D" />
      </TouchableOpacity>

      {/* Two Progress Lines */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLineActive} />
        <View style={styles.progressLineActive} />
        <View style={styles.progressLineInactive} />
      </View>

      <Text style={styles.title}>What do you do?</Text>
      <Text style={styles.subtitle}>Let us know about your secondary role</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.micWrapper}>
            <View style={styles.micOuterCircle}>
                <View style={styles.micInnerCircle}>
                    <MicIcon width={28} height={28} color="#FFFFFF" />
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleSecondaryRole}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFFFFF' },
  backButton: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 1,
    borderColor: '#54219D', justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  selectedImageBorder: {
  borderColor: '#54219D',
},
  progressContainer: {
  flexDirection: 'row',
  alignSelf: 'flex-start',
  gap: 6,
  marginBottom: 12,
},

progressLineActive: {
  width: 30,
  height: 4,
  backgroundColor: '#54219D',
  borderRadius: 2,
},

progressLineInactive: {
  width: 30,
  height: 4,
  backgroundColor: '#D9D9D9',
  borderRadius: 2,
},

  title: { fontSize: 24, fontWeight: '700', color: '#3F1976', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  grid: { paddingBottom: 20 },
  card: {
    alignItems: 'center',
    width: '48%',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
  width: 75,
  height: 75,
  borderRadius: 75 / 2,
  borderWidth: 2,
  borderColor: '#A2A2A2', // grey-500
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
},
image: {
  width: 65,
  height: 65,
  borderRadius: 65 / 2,
},


  cardText: { fontSize: 13, textAlign: 'center' },
  bottomContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  micWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
},

micOuterCircle: {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: '#865DFF4D', // outer glow at 30%
  justifyContent: 'center',
  alignItems: 'center',
},

micInnerCircle: {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: '#865DFF', // solid purple inner
  justifyContent: 'center',
  alignItems: 'center',
},

  nextButton: {
    flex: 1, 
    marginLeft: 16, 
    backgroundColor: '#6929C4',
    paddingVertical: 14, 
    borderRadius: 25, 
    alignItems: 'center',
    height:48,
  },
  nextText: { 
    color: '#fff', 
    fontWeight: 'medium',
    fontSize:16, 

  },
  errorText: {
    fontSize: 14,
    color: '#D00416',
    marginBottom: 8,
    textAlign: 'left',
  },
});
