// SelectLanguageScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VoiceInputErrorModal from '../../components/VoiceInputErrorModal';
//import VoiceInputErrorModal from '../../components/VoiceInputErrorModal.tsx';


const { width } = Dimensions.get('window');

const languages = [
  { label: 'Hindi', native: 'हिंदी' },
  { label: 'English', native: 'English' },
  { label: 'Tamil', native: 'தமிழ்' },
  { label: 'Kannada', native: 'ಕನ್ನಡ' },
  { label: 'Marathi', native: 'मराठी' },
  { label: 'Bengali', native: 'বাংলা' },
  { label: 'Gujarati', native: 'ગુજરાતી' },
  { label: 'Assamese', native: 'অসমীয়া' },
  { label: 'Urdu', native: 'اُردُو' },
  { label: 'Malayalam', native: 'മലയാളം' },
  { label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export default function SelectLanguageScreen({navigation}:any) {
  const [selected, setSelected] = useState('Hindi');
  // const { permissionStatus, requestPermission } = useMicrophonePermission();
  const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   if (permissionStatus === 'denied' || permissionStatus === 'blocked') {
  //     setShowPopup(true);
  //   }
  // }, [permissionStatus]);
  
  const handleSave=()=>{
    navigation.navigate('Login');
  }
  const renderItem = ({ item }: any) => {
    const isSelected = selected === item.label;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelected(item.label)}
      >
        <Text style={[styles.langLabel, isSelected && styles.selectedText]}>
          {item.label}
        </Text>
        <Text style={[styles.nativeText, isSelected && styles.selectedText]}>
          {item.native}
        </Text>
      </TouchableOpacity>
    );
  };

  function requestPermission() {
    console.log('Function is required!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select One Language</Text>
      <Text style={styles.subtitle}>Tap or speak in your preferred language</Text>

      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    
      <VoiceInputErrorModal
        visible={showPopup}
        onTryAgain={() => {
          setShowPopup(false);
          requestPermission(); // re-trigger permission check
        }}
      />
      <View style={styles.footer}>
        <LinearGradient
            colors={['#FDCA4F', '#6929C4', '#97EAD2']}
            start={{ x: 0.1, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            locations={[0.0, 0.35, 1.0]}
            style={styles.voiceButton}
        >
          <TouchableOpacity style={{flexDirection:'row', alignSelf:'flex-start'}} onPress={()=>{setShowPopup(true);}}>
            <Image source={require('../../assets/images/mic2.png')}/>
            <Text style={styles.voiceText}> Speak Your Language</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
const CARD_WIDTH = (width - 72) / 3; // 24px padding + 16px gap * 2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    backgroundColor: '#FDFDFD',
    alignContent:"center",
    justifyContent:'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3F1976',
    alignSelf:'flex-start'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5768',
    alignSelf:'flex-start'
  },
  grid: {
    marginTop:16,
    alignItems:'stretch',
    gap: 8,
    aspectRatio:0.69

  },
  card: {
    width: CARD_WIDTH,
    aspectRatio:1,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    borderWidth: 2,
    borderColor: '#326CF9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
  },
  selectedCard: {
    backgroundColor: '#326CF9',
  },
  langLabel: {
    fontSize: 12,
    color: '#326CF9',
  },
  nativeText: {
    fontSize: 12,
    color: '#326CF9',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  footer: {
  
    bottom: 32,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap:'10%'
  },
  voiceButton: {

    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceText: {
    color: '#EEEEEE',
    fontSize: 16,
 
  },
  saveButton: {
    backgroundColor: '#6929C4',
    marginLeft:2,
    borderRadius: 48,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf:'flex-end'
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    alignSelf:'center'
  },
});
