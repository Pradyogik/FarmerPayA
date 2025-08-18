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
import Icon from 'react-native-vector-icons/Feather';
import ArrowBack from '../../../assets/images/ArrowBack.svg';
import HomeIcon from '../../../assets/images/HomeIcon.svg';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';
//import { Alert } from 'react-native';

const { width, height } = Dimensions.get('window');
const SignUpFormScreen1 = ({ navigation, route }: any) => {

  const { user_id, mobile } = route.params;

  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  {/* Gender Drop Down */}
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

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

const handleRegisterFarmer = async () => {
  try {
    if (!fullName || !gender || !age || !contact) {
      setError('');
      setError('Please fill all fields.');
      return;
    }

    const response = await axios.post(`${BASE_URL}/farmer/register`, {
      user_id,  
      full_name: fullName,
      gender,
      age,
      mobile_number: contact, 
      email: '' 
    });

    if (response.status === 201) {
      console.log('Farmer registered successfully');

      try {
        const patchRes = await axios.patch(`${BASE_URL}/user/update-isRegistered/${user_id}`);
        console.log('Status updated to REGISTERED:', patchRes.data);
      } catch (patchError) {
        console.error('Failed to update user status:', patchError);
      }

      navigation.navigate('SignUpForm2',{user_id });
    }
  } catch (error) {
    const err = error as any;
    console.error('Registration Error:', err?.response?.data || err?.message);
    setError('');
    setError(err?.response?.data?.message || 'Something went wrong');
  }
};

  return (
    <ScrollView>
    <View style={styles.container}>
      <Pressable onPress={()=>{navigation.goBack()}} style={{marginBottom:40}}>
        <ArrowBack/>
      </Pressable>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Hello! Farmer</Text>
        <Text style={styles.subheading}>Create your account to continue</Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.formContainer}>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Full Name</Text>
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
          <Text style={styles.label}>Enter Contact Number</Text>
          <View style={styles.inputBox}>
            <Icon name="phone" size={20} color="#C0C0C0" />
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor="#C0C0C0"
              keyboardType="phone-pad"
              value={contact}
              onChangeText={setContact}
            />
          </View>
        </View> 

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Gender</Text>
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Age</Text>
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
        {/*
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter House Number</Text>
          <View style={styles.inputBox}>
           <HomeIcon/>
            <TextInput
              style={styles.input}
              placeholder="Enter your house, flat, apartment no."
              placeholderTextColor="#C0C0C0"
              keyboardType="phone-pad"
              value={contact}
              onChangeText={setContact}
            />
          </View>
        </View> 
      
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Father’s Name</Text>
          <View style={styles.inputBox}>
            <Icon name="user-check" size={20} color="#C0C0C0" />
            <TextInput
              style={styles.input}
              placeholder="Enter your father's name"
              placeholderTextColor="#C0C0C0"
              value={fatherName}
              onChangeText={setFatherName}
            />
          </View>
        </View>
        */}
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleRegisterFarmer}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

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
    </ScrollView>
  );
};
export default SignUpFormScreen1;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
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
    paddingLeft: 16,
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
    fontSize: 18,
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
  errorText: {
    fontSize: 14,
    color: '#D00416',
    marginBottom: 8,
    textAlign: 'left',
  },
});