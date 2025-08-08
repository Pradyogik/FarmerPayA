import React, { useState, useRef } from 'react';
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
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';

import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import { Phone } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMob, setError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  // Animated values for smooth transitions
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateFocus = (focused: boolean) => {
    // Border color animation
    Animated.timing(borderColorAnim, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Subtle scale animation for the input block
    Animated.timing(scaleAnim, {
      toValue: focused ? 1.02 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleFocus = () => {
    setIsInputFocused(true);
    animateFocus(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    animateFocus(false);
    Keyboard.dismiss();
  };

  const handleOutsidePress = () => {
    if (isInputFocused) {
      inputRef.current?.blur();
    }
  };

  const handleInputBlockPress = () => {
    inputRef.current?.focus();
  };

  const handleGetOtp = async () => {
    const isValid = /^[6-9]\d{9}$/.test(phoneNumber);
    if (!isValid) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    try {
      const payload = {
        mobile: `${phoneNumber}`,
      };
      console.log('Payload being sent:', payload);

      const response = await axios.post(`${BASE_URL}/auth/send-otp`, payload);
      console.log('OTP Sent:', response.data);
      navigation.navigate('OtpScreen', { mobile: phoneNumber });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log('Server error response:', err.response?.data);
        Alert.alert(
          'Error',
          err.response?.data?.message || 'Something went wrong.',
        );
      } else {
        console.log('Unknown error:', (err as Error).message);
        Alert.alert('Network Error', 'Please check your internet.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {/* Image Container - Takes remaining space */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/farm-cow.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Form Container - Fixed minimum height with flexible content */}
          <View style={styles.formContainer}>
            <View style={styles.formContent}>
              <Text style={styles.title}>Log In</Text>
              <Text style={styles.subtitle}>
                We will send an OTP to this number for verification
              </Text>

              <TouchableOpacity style={[styles.inputBlock, isInputFocused && styles.inputBlockFocused]} onPress={handleInputBlockPress} activeOpacity={1}>
                <Text style={styles.label}>Mobile Number</Text>
                <View style={styles.input}>
                  <Phone color="#A2A2A2" size={20} />
                  <View style={styles.line} />
                  <TextInput
                    ref={inputRef}
                    style={styles.textInput}
                    placeholder="Enter your mobile number"
                    keyboardType="phone-pad"
                    placeholderTextColor={'#A2A2A2'}
                    cursorColor={'#000000'}
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </View>
                {errorMob ? <Text style={styles.errorText}>{errorMob}</Text> : null}
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Terms at bottom */}
            <View style={styles.termsContainer}>
              <TouchableOpacity>
                <Text style={styles.termsText}>
                  By proceeding you are agreeing to farmerpay's{' '}
                  <Text style={styles.link}>Terms & Conditions</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  imageContainer: {
    flex: 1, // Takes remaining space after form container
    minHeight: 200, // Minimum height to ensure image is visible
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    minHeight: 350, // Fixed minimum height for form
    justifyContent: 'space-between', // Space between content and terms
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    // Android drop shadow
    ...Platform.select({
      android: {
        elevation: 20,
        shadowColor: '#000',
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),


  },
  formContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4B5768',
    marginBottom: 24,
  },
  inputBlock: {
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 20,
  },
  inputBlockFocused: {
    borderColor: '#6929C4', // Dark purple border when focused
  },
  label: {
    fontSize: 12,
    color: '#121212',
    paddingVertical: 16,
  },
  input: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingBottom: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    color: '#000000',
    paddingVertical: 0,
  },
  errorText: {
    color: '#FB3748',
    fontSize: 10,
    marginTop: 2,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 2,
  },
  button: {
    backgroundColor: '#6929C4',
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  termsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  termsText: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 16,
  },
  link: {
    color: '#54219D',
  },
});

