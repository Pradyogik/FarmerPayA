import React, { useState } from 'react';
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
  Alert,
} from 'react-native';
import VillageIcon from '../../../assets/images/VillageIcon.svg';
import GpsIcon from '../../../assets/images/GpsIcon.svg';
import StateIcon from '../../../assets/images/StateIcon.svg';
import ArrowBack from '../../../assets/images/ArrowBack.svg';
import HomeIcon from '../../../assets/images/HomeIcon.svg';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';

const AgentSignUp2 = ({ navigation, route }: any) => {
  const { user_id, mobile } = route.params;

  const [ formData , setFormData ] = useState({
    houseNo: '',
    villageName: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterAgent = async()=>{
    const { houseNo, villageName, city, pincode, state } = formData;

    if (!houseNo || !villageName || !city || !pincode|| !state) {
      setErrorMessage('Please fill all fields');
      return;
    }
    try{
      console.log('📦 Sending data to backend:', {
        user_id: user_id,
        house_no: houseNo,
        village_or_town: villageName,
        city_or_district: city,
        pincode,
        state,
      });

      const response = await axios.post(`${BASE_URL}/agent/address`,{
        user_id:user_id,
         house_no: houseNo,
        village_or_town: villageName,
        city_or_district: city,
        pincode,
        state,
      });

      console.log('Agent Address Registered: ', response.data,checked);
      navigation.navigate('AgentSignUp3', { 
        user_id,
        mobile,
        house_no: houseNo,
        village_or_town: villageName,
        city_or_district: city,
        pincode,
        state,
        same_as_permanent: checked,
      });

    }catch(error:any){
      console.log('Data was:',{
        user_id: user_id,
        house_no: houseNo,
        village_or_town: villageName,
        city_or_district: city,
        pincode,
        state,
      });

      console.error('Error in Address Registeration :', error);
      setErrorMessage(error?.response?.data?.message || 'Failed to register. Please try again.');
    }
  };
  const [checked, setChecked] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 ,paddingTop:40,backgroundColor:'#fff'}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
        <Pressable onPress={()=>{navigation.goBack()}} style={{marginHorizontal:24}}>
         <ArrowBack/>
        </Pressable>

        <Text style={styles.label0}>PERMANENT ADDRESS</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
          
            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter House Number</Text>
              <View style={styles.inputBox}>
          
              <HomeIcon height={20} width={20} color={'#A0A0A0'}/> 
              <TextInput
                placeholder="Enter your house, flat, apartment no."
                style={styles.input}
                placeholderTextColor="#C0C0C0"
                value={formData.houseNo}
                onChangeText={text => setFormData({ ...formData, houseNo: text })}
              />
            </View></View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter Village</Text>
              <View style={styles.inputBox}>  
               <VillageIcon height={25} width={25} color={'#A0A0A0'}/> 
              <TextInput
                placeholder="Enter your village/town name"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
                value={formData.villageName}
                onChangeText={text => setFormData({ ...formData, villageName: text })}
              /></View>

            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter City/District Name</Text>
              <View style={styles.inputBox}>
              <VillageIcon height={25} width={25} fill='#A0A0A0'/> 
              <TextInput
                placeholder="Choose your city"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
                value={formData.city}
                onChangeText={text => setFormData({ ...formData, city: text })}
              />
              </View>
            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter Pincode</Text>
              <View style={styles.inputBox}>
              <GpsIcon height={25} width={25} fill='#A0A0A0'/> 
              <TextInput
                placeholder="Turn on gps to drop precise pin"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
                value={formData.pincode}
                onChangeText={text => {
                  const cleaned = text.replace(/[^0-9]/g, '');
                  if (cleaned.length <= 6) {
                  setFormData({ ...formData, pincode: text });
                  }
                }}
                keyboardType="number-pad"
                maxLength={6}
              />
              </View>
            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter State</Text>
              <View style={styles.inputBox}>
              <StateIcon height={25} width={25} />
              <TextInput
                placeholder="Choose your state"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
                value={formData.state}
                onChangeText={text => setFormData({ ...formData, state: text })}
              />
              </View>
            </View>
            
         <Pressable style={styles.checkboxRow} onPress={() => setChecked(!checked)}>
                         {checked?<View style={styles.checked}/>:<View style={styles.checkbox}/>}
                         <Text style={{fontSize: 12,fontWeight: '500',color: '#797979',}}>Use this as Correspondence Address</Text>
          </Pressable>
           <View style={{gap:16}}>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('AgentSignUp3',{formData,checked})}}>
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
    paddingTop:24,
    padding: 24,
  },
    label0: {
    marginHorizontal:32,
    color:'#797979',
    width: 245,
    paddingTop:40,
    fontSize:14,
    alignItems: 'center', // applies if in a View
     // ⚠️ Only works in newer RN versions or with View
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
    backgroundColor: '#54219D',
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
    checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:6,
    gap: 8,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#54219D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderWidth: 5,
    borderColor: '#54219D',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default AgentSignUp2;
