import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import Call from "../../assets/images/Call.svg";
import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import LargeButton from '../../utils/customs/LargeButton';

const{width,height}=Dimensions.get('window');

const LoginScreen = ({navigation}:any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMob, setError]= useState('');

  const handleGetOtp = async () => {
    const isValid = /^[6-9]\d{9}$/.test(phoneNumber);
    if (!isValid) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return;
    }
    setError('');
    try {
      const payload = {
        mobile: `${phoneNumber}`, // Ensure it matches the server-side expectation
      };
      console.log("Payload being sent:", payload);

      const response = await axios.post(`${BASE_URL}/auth/send-otp`, payload);
      console.log("OTP Sent:", response.data);
      navigation.navigate('OtpScreen', { mobile: phoneNumber });

      // proceed with navigation or OTP screen
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("Server error response:", err.response?.data);
        Alert.alert("Error", err.response?.data?.message || "Something went wrong.");
      } else {
        console.log("Unknown error:", (err as Error).message);
        Alert.alert("Network Error", "Please check your internet.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top illustration */}
      <Image
        source={require('../../assets/images/farm-cow.png')} // Replace with your own image
        style={styles.image}
        resizeMode="contain"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formContainer}
      >
        {/* Heading */}
        <View style={styles.header}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>Welcome back to the app</Text>
          <View style={styles.horizontalLine} />
        </View>
        
        {/* Phone Input */}
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Enter Contact Number</Text>
          <View             style={[
                    styles.input,
                    { borderColor: errorMob ? "#FB3748" : "#F2F2F2" }
                  ]}>
          <Call/>
          <TextInput
            placeholder="Enter your mobile number"
            placeholderTextColor="#C0C0C0"

            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={  (text) => {
                            setPhoneNumber(text);
                          }}
            value={phoneNumber}
          />
          </View>
          {errorMob && <Text style={{color:'#FB3748' ,fontSize:10,marginTop:2}}>{errorMob}</Text>}
          <Text style={styles.helperText}>We will send you an OTP on this number</Text>
        </View>

        {/* Get OTP Button */}
        <LargeButton title="Get OTP" onPress={handleGetOtp} />

        {/* Terms */}
        <TouchableOpacity>
          <Text style={styles.termsText}>
            By proceeding you are agreeing to farmerpay’s{' '} 
            <Text style={styles.link}>Terms & Conditions</Text></Text>
         
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
  },
  image: {
    width: width*0.7,
    aspectRatio:1,
    marginTop: 16,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  header: {
    width: '80%',
    marginBottom: 16,
    flexDirection:'column',
    flexWrap:'wrap',
    alignSelf:'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3F1976',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#D3D3D3', // light grey
    marginTop: 16, // space above & below the line
    },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B5768',
    marginTop: 4,
  },
  inputBlock: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: 'rgba(18, 18, 18, 0.87)',
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection:'row',
    gap:6,
    alignItems:'center',
    height: 48,
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  helperText: {
    fontSize: 10,
    color: '#A2A2A2',
    alignSelf:'flex-start',
    marginTop: 8,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6929C4',
    borderRadius: 48,
    height: 60,
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  termsText: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
  link: {
    color: '#54219D',
  },
});
