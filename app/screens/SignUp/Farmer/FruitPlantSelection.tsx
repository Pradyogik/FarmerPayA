import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MicIcon from '../../../assets/images/mic.svg';
import BackArrow from '../../../assets/images/back-arrow.svg';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';

const plants = [
  { id: '23', title: 'Guava', image: require('../../../assets/images/selection/guava.png') },
  { id: '24', title: 'Apple', image: require('../../../assets/images/selection/apple.png') },
  { id: '25', title: 'Lemon', image: require('../../../assets/images/selection/lemon.png') },
  { id: '26', title: 'Sweet Lime', image: require('../../../assets/images/selection/sweet-lime.png') },
  { id: '27', title: 'Kinnow', image: require('../../../assets/images/selection/kinnow.png') },
  { id: '28', title: 'Grapefruit', image: require('../../../assets/images/selection/grapefruit.png') },
  { id: '29', title: 'Pineapple', image: require('../../../assets/images/selection/pineapple.png') },
  { id: '30', title: 'Orange', image: require('../../../assets/images/selection/orange.png') },
  ];

export default function FruitPlantSelection ({ navigation ,route}: any) {
  const {user_id} = route.params;
  const [selected, setSelected] = useState<string[]>([]);
  const [warning, setWarning] = useState('');
  const [errorSelect,setError] = useState('');
  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
      setWarning(''); 
    } else {
      if (selected.length >= 3) {
        setWarning('You can select up to 3 plants only.');
        return;
      }
      setSelected([...selected, id]);
      setWarning('');
    }
  };

  const renderItem = ({ item }: any) => {
    const isSelected = selected.includes(item.id);
    return (
      <TouchableOpacity style={styles.card} onPress={() => toggleSelect(item.id)}>
        <View style={[styles.imageContainer,isSelected && styles.selectedImageBorder,]}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.cardText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const handleSelectedPlants = async () => {
  if (selected.length < 1) {
    setError('Please select at least 1 plant.');
    return;
  }

  setWarning('');
  setError('');

  const selectedPlantTitles = selected.map(id => {
    const plant = plants.find(p => p.id === id);
    return plant?.title || '';
  });

  console.log('Selected Plants:', selectedPlantTitles);

  try {
    const response = await axios.post(
      `${BASE_URL}/farmer/${user_id}/plant-selection`,
      {
        user_id,
        plants: selectedPlantTitles // backend expects an array of titles
      }
    );
    console.log('Plant Selection saved successfully:', response.data);
    navigation.navigate('Main', { user_id });

  } catch (error: any) {
    console.error('Error saving Plant Selection (frontend catch):', {
      message: error?.response?.data?.message,
      full: error?.response,
    });

    setError(
      error?.response?.data?.message || 'Failed to save Plant Selection. Try again.'
    );
  }
};



  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity  onPress={() => navigation.goBack()} style={{ marginBottom: 32 }}>
        <BackArrow color="#54219D" />
      </TouchableOpacity>

      {/* Progress Lines (3 active) */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLineActive} />
        <View style={styles.progressLineActive} />
        <View style={styles.progressLineActive} />
      </View>

      {/* Heading */}
      <Text style={styles.title}>What do you yield?</Text>
      <Text style={styles.subtitle}>Let us know about your plants (select max. 3)</Text>
      {warning ? <Text style={styles.warningText}>{warning}</Text> : null}

      {/* List of options */}
      <FlatList
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        />

      {/* Footer Buttons */}
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
          onPress={handleSelectedPlants}
        >
          <Text style={styles.nextText} >Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFFFFF' },
  
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3F1976',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  grid: {
    paddingBottom: 100,
  },
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

  cardText: {
    fontSize: 13,
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: '#54219D',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  warningText: {
  color: 'red',
  fontSize: 13,
  marginTop: -10,
  marginBottom: 10,
  textAlign: 'center',
},
});
