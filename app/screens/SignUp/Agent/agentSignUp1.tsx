import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import ArrowBack from '../../../assets/images/ArrowBack.svg';
import CardIcon from '../../../assets/images/agentSignUp/CardIcon.svg';
import BankIcon from '../../../assets/images/BankIcon.svg';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';

import LargeButton from '../../../utils/customs/LargeButton';
const { width, height } = Dimensions.get('window');

const AgentSignUp1 = ({ navigation , route}: any) => {

  const { user_id, mobile } = route.params;
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [panCard, setPanCard] = useState('');
  const [designation, setDesignation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
   const [checked, setChecked] = useState({
    bankSakhi: false,
    pacs: false,
    fpo:false,
    csc:false,
    vittaSakhi: false,
    Adathiya:false
  });
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  const ageOptions = [
    { label: '18-29', value: '18-29' },
    { label: '29-55', value: '29-55' },
    { label: '55+', value: '55+' },
  ];
  const designationOptions = [
  { label: 'Bank Sakhi', value: 'Bank Sakhi' },
  { label: 'PACS Secretary', value: 'PACS' },
  { label: 'FPO Secretary', value: 'FPO' },
  { label: 'CSC', value: 'CSC' },
  { label: 'Vitta Sakhi', value: 'Vitta Sakhi' },
  { label: 'Adathiya', value: 'Adathiya' },
];
  
  const handleRegisterAgent = async () => {
  const selectedDesignation = Object.keys(checked).find(key => checked[key as keyof typeof checked]) || '';
  
  if (!fullName || !gender || !age || !selectedDesignation || !aadharCard || !panCard) {
    setErrorMessage('Please fill all fields');
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/agent/`, {
      user_id,
      full_name: fullName,
      gender,
      age,
      designation: selectedDesignation, // from radio selection
      aadhar_card: aadharCard,
      pan_card: panCard,
      mobile,
      email: "" // optional for now
    });

    console.log('Agent Registered: ', response.data);

    try {
      const patchRes = await axios.patch(`${BASE_URL}/user/update-isRegistered/${user_id}`);
      console.log('Status updated to REGISTERED:', patchRes.data);
    } catch (patchError) {
      console.error('Failed to update user status:', patchError);
    }

    navigation.navigate('AgentSignUp2', { user_id, mobile });

  } catch (error: any) {
    console.log('Data was:', {
      user_id,
      full_name: fullName,
      gender,
      age,
      designation: selectedDesignation,
      aadhar_card: aadharCard,
      pan_card: panCard,
      mobile,
      email: ""
    });

    console.error('Error in Registration:', error);
    setErrorMessage(error?.response?.data?.message || 'Failed to register. Please try again.');
  }
};


  return (
    <ScrollView>
    <View style={styles.container}>
      <Pressable onPress={()=>{navigation.goBack()}} style={{marginBottom:40}}>
        <ArrowBack/>
      </Pressable>

      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Hello! Agent</Text>
        <Text style={styles.subheading}>Create your account to continue</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Full Name 
        <Text style={{color:'#FF0000'}}>* Indicates Required</Text>*/}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Full Name<Text style={{color:'#FF0000'}}>*</Text></Text>
          <View style={styles.inputBox}>
            <Icon name="user" size={20} color="#C0C0C0" />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#C0C0C0"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Age<Text style={{color:'#FF0000'}}>*</Text></Text>
          <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={setAge}
            value={age}
            placeholder={{ label: 'Select your Age group', value: null }}
            items={ageOptions}
            useNativeAndroidPickerStyle={false}
            style={{
              inputAndroid: styles.pickerInput,
              inputIOS: styles.pickerInput,
              placeholder: {
                color: '#C0C0C0',
              },
            }}
            Icon={() => (
              <Icon
                name="chevron-down"
                size={20}
                color="#C0C0C0"
                style={styles.pickerIcon}
              />
            )}
          />
          </View>
        </View>
                {/* Gender Drop Down */}
                        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Gender<Text style={{color:'#FF0000'}}>*</Text></Text>
          <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={setGender}
            value={gender}
            placeholder={{ label: 'Select your Gender', value: null }}
            items={genderOptions}
            useNativeAndroidPickerStyle={false}
            style={{
              inputAndroid: styles.pickerInput,
              inputIOS: styles.pickerInput,
              placeholder: {
                color: '#C0C0C0',
              },
            }}
            Icon={() => (
              <Icon
                name="chevron-down"
                size={20}
                color="#C0C0C0"
                style={styles.pickerIcon}
              />
            )}
    />
          </View>
        </View>
       
        {/* Designation Options */}
<Text style={styles.label}>Choose Your Designation <Text style={{color:'#FF0000'}}>*</Text></Text>

<View style={{ gap: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <TouchableOpacity onPress={() => setChecked({
      bankSakhi: true, pacs: false, fpo: false, csc: false, vittaSakhi: false, Adathiya: false
    })} style={styles.checkItem}>
      {checked.bankSakhi ? <View style={styles.checkedCircle} /> : <View style={styles.circleCheck} />}
      <Text>Bank Sakhi</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setChecked({
      bankSakhi: false, pacs: true, fpo: false, csc: false, vittaSakhi: false, Adathiya: false
    })} style={styles.checkItem}>
      {checked.pacs ? <View style={styles.checkedCircle} /> : <View style={styles.circleCheck} />}
      <Text>PACS Secretary</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setChecked({
      bankSakhi: false, pacs: false, fpo: true, csc: false, vittaSakhi: false, Adathiya: false
    })} style={styles.checkItem}>
      {checked.fpo ? <View style={styles.checkedCircle} /> : <View style={styles.circleCheck} />}
      <Text>FPO Secretary</Text>
    </TouchableOpacity>
  </View>

  <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
    <TouchableOpacity onPress={() => setChecked({
      bankSakhi: false, pacs: false, fpo: false, csc: false, vittaSakhi: true, Adathiya: false
    })} style={styles.checkItem}>
      {checked.vittaSakhi ? <View style={styles.checkedCircle} /> : <View style={styles.circleCheck} />}
      <Text>Vitta Sakhi</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setChecked({
      bankSakhi: false, pacs: false, fpo: false, csc: false, vittaSakhi: false, Adathiya: true
    })} style={styles.checkItem}>
      {checked.Adathiya ? <View style={styles.checkedCircle} /> : <View style={styles.circleCheck} />}
      <Text>Adathiya</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setChecked({
      bankSakhi: false, pacs: false, fpo: false, csc: true, vittaSakhi: false, Adathiya: false
    })} style={styles.checkItem}>
      {checked.csc ? <View style={styles.checkedCircle} /> : <View style={styles.circleCheck} />}
      <Text>CSC</Text>
    </TouchableOpacity>
  </View>
</View>


        {/* Adhaar Card */}
        <View style={styles.inputGroup}>
         <Text style={styles.label}>Enter Adhaar Card Number<Text style={{color:'#FF0000'}}>*</Text></Text>
          <View style={styles.inputBox}>
            <CardIcon height={20} width={20}/>
            <TextInput
              style={styles.input}
              placeholder="Enter 12 digits of your Adhaar Card"
              placeholderTextColor="#C0C0C0"
              value={aadharCard}
              onChangeText={setAadharCard}
              maxLength={12}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* PAN Card Number */}
        <View style={styles.inputGroup}>
        <Text style={styles.label}>Enter PAN Card Number<Text style={{color:'#FF0000'}}>*</Text></Text>
          <View style={styles.inputBox}>
          <CardIcon height={20} width={20}/>
          <TextInput
            style={styles.input}
            placeholder="Enter 10-character PAN number"
            placeholderTextColor="#C0C0C0"
            value={panCard}
            onChangeText={setPanCard}
            maxLength={10}
            autoCapitalize="characters"
          />
          </View>
        </View>

        {/* Continue Button */}
        <LargeButton title="Continue" onPress={handleRegisterAgent}/>

        {/* Log In Footer */}
        <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          Log in
        </Text>
        </Text>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor:'#fff'
  },
  headerContainer: {
    marginBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: '500',
    color: '#3F1976',
  },
  subheading: {
    fontSize: 14,
    color: '#4B5768',
    marginTop: 8,
  },
  formContainer: {
    gap: 24,
   marginBottom: 24,
   marginTop:24
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(18, 18, 18, 0.87)',
  },
  inputBox: {
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
  continueButton: {
    backgroundColor: '#6929C4',
    height: 60,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom:16
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  footerText: {
    textAlign: 'center',
    marginBottom:32,
    fontSize: 12,
    color: '#000',
    fontWeight: '300',
  },
  loginLink: {
    color: '#28a745',
    fontWeight: '500',
  },
  pickerContainer: {
  borderWidth: 2,
  borderColor: '#f2f2f2',
  borderRadius: 8,
  backgroundColor: '#fff',
  height: 48,
  justifyContent: 'center',
  paddingHorizontal: 16,
  position: 'relative',
},
pickerInput: {
  fontSize: 12,
  color: '#000',
},
pickerIcon: {
  position: 'absolute',
  right:16,
  top: 14,
},
circleCheck:{
  borderRadius:16,
  width: 20, 
  height: 20, 
  borderColor:'#97EAD2',
  borderWidth:2
},
checkedCircle:{

    borderRadius:16,
  width: 20, 
  height: 20, 
  borderColor:'#97EAD2',
  borderWidth:6
},
checkItem:{
  flexDirection:'row',
  alignItems:'center', 
  justifyContent:'center',
  paddingTop:8,
  gap:8,
},
errorText: {
  color: 'red',
  fontSize: 12,
  marginTop: 4,
},
});

export default AgentSignUp1;
