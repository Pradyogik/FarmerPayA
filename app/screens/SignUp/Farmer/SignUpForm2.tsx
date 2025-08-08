import React,{useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  Pressable,
  Image,
  //Alert,
} from 'react-native';
import VillageIcon from '../../assets/images/VillageIcon.svg';
import StateIcon from '../../assets/images/StateIcon.svg';
import ArrowBack from '../../assets/images/ArrowBack.svg';
import HomeIcon from '../../assets/images/HomeIcon.svg';
import GpsIcon from '../../assets/images/GpsIcon.svg';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';

const SignUpFormScreen2 = ({ navigation, route }: any) => {

  const { user_id } = route.params;
  console.log("Signup2 received ", user_id);

  const [houseNo, setHouseNo] = useState('');
  const [village, setVillage] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [error, setError]= useState('');

  const handleSubmitAddress = async () => {
    if (!houseNo || !village || !city || !state) {
      setError('Validation Error: All fields are required.');
      return;
    }
    
    try {
      const response = await axios.post(`${BASE_URL}/farmer/add-address`, {
        user_id,
        address_type: 'local',
        country_id: 1,
        state_id: state,    // string temporarily
        city_id: city,      // string temporarily
        area_id: 1,
        house_no: houseNo,
        village,
        mollha: '',
        pincode,
        Latitude: '',
        Longitude: '',
      });
      console.log('Posting to:', `${BASE_URL}/farmer/add-address`);


      //Alert.alert('Success', response.data.message);
      navigation.navigate('primaryRole',{user_id});
    } catch (error: any) {
      console.error('Address Error: ', error);

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
      error('Error', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 ,paddingTop:40,backgroundColor:'#fff'}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <Pressable onPress={()=>{navigation.goBack()}} style={{marginHorizontal:24}}>
        <ArrowBack/>
      </Pressable>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
           {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.container}>
          
            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter House Number</Text>
              <View style={styles.inputBox}>
          
              <HomeIcon height={20} width={20} color={'#A0A0A0'}/> 
              <TextInput
                value={houseNo}
                onChangeText={setHouseNo}
                placeholder="Enter your house, flat, apartment no."
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              />
            </View></View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter Village</Text>
              <View style={styles.inputBox}>  
               <VillageIcon height={25} width={25} color={'#A0A0A0'}/> 
              <TextInput
                value={village}
                onChangeText={setVillage}
                placeholder="Enter your village/town name"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              /></View>

            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter City/District Name</Text>
              <View style={styles.inputBox}>
              <VillageIcon height={25} width={25} fill='#A0A0A0'/> 
              <TextInput
                value={city}
                onChangeText={setCity}
                placeholder="Choose your city"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              />
              </View>
            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter Pincode</Text>
              <View style={styles.inputBox}>
              <GpsIcon height={25} width={25} fill='#A0A0A0'/> 
              <TextInput
                value={pincode}
                onChangeText={text => {
                  const cleaned = text.replace(/[^0-9]/g, '');
                  if (cleaned.length <= 6) {
                  setPincode(cleaned);
                }}}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="Turn on gps to drop precise pin"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              />
              </View>
            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter State</Text>
              <View style={styles.inputBox}>
              <StateIcon height={25} width={25} />
              <TextInput
                value={state}
                onChangeText={setState}
                placeholder="Choose your state"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              />
              </View>
            </View>
           <View style={{gap:16}}>
            <TouchableOpacity style={styles.button} onPress={handleSubmitAddress}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                Log in
              </Text>
            </Text></View>
           </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop:40,
    padding: 24,
  },
  container: {
    flex: 1,
  
    gap:24
  },
  formGroup: {
    
    gap:8
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(18, 18, 18, 0.87)',
  },
  inputBox:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 2,
    borderColor: '#f2f2f2',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 12,
    marginLeft: 8,
    color: '#000',
  },
  button: {
    height: 60,
    backgroundColor: '#6929C4',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    color: '#000000',
    
  },
  loginLink: {
    color: '#79BBA8',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 14,
    color: '#D00416',
    marginBottom: 8,
    textAlign: 'left',
  },
});

export default SignUpFormScreen2;
