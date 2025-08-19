import React, { useState, useRef, useMemo } from 'react';
import {
  View,
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

import Text from '../../components/Text/Text';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import { Phone } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const FONT = 'Inter'; // make sure Inter is loaded in your project

const LoginScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMob, setError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Animations
  const borderColorAnim = useRef(new Animated.Value(0)).current; // JS-driven (borderColor not supported by native driver)
  const scaleAnim = useRef(new Animated.Value(1)).current; // Native-driven (transform)
  const isFocusedRef = useRef(false);

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#6C47FF'], // gray-200 -> primary
  });

  const isValidPhone = useMemo(
    () => /^[6-9]\d{9}$/.test(phoneNumber),
    [phoneNumber],
  );

  const animateFocus = (focused: boolean) => {
    // prevent re-running same animation repeatedly
    if (isFocusedRef.current === focused) return;
    isFocusedRef.current = focused;

    // JS-driven color animation
    Animated.timing(borderColorAnim, {
      toValue: focused ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();

    // Native-driven scale animation
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.01 : 1,
      friction: 7,
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
    if (isInputFocused) inputRef.current?.blur();
  };

  const handleGetOtp = async () => {
    if (!isValidPhone) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    try {
      const payload = { mobile: `${phoneNumber}` };
      const response = await axios.post(`${BASE_URL}/auth/send-otp`, payload);
      console.log('OTP Sent:', response.data);
      navigation.navigate('OtpScreen', { mobile: phoneNumber });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        Alert.alert(
          'Error',
          err.response?.data?.message || 'Something went wrong.',
        );
      } else {
        Alert.alert('Network Error', 'Please check your internet.');
      }
    }
  };

  const handlePhoneNumberChange = (text: string) => {
    const numericOnly = text.replace(/[^0-9]/g, '');
    const limitedText = numericOnly.slice(0, 10);
    setPhoneNumber(limitedText);
    if (errorMob) setError('');
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {/* Top illustration */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/farm-cow.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Card form */}
          <View style={styles.formContainer}>
            <View style={styles.formContent}>
              <Text style={styles.title} fontWeight="800">
                Log in
              </Text>
              <Text style={styles.subtitle}>
                We’ll send an OTP to this number for verification
              </Text>

              {/* Split animation wrappers to avoid driver conflict */}
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Animated.View
                  style={[
                    styles.inputBlock,
                    { borderColor: animatedBorderColor },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => inputRef.current?.focus()}
                    activeOpacity={1}
                  >
                    <Text style={styles.label}>Mobile number</Text>
                    <View style={styles.inputRow}>
                      <View style={styles.ccBlock}>
                        <Phone size={18} color="#6B7280" />
                        <Text style={styles.ccText}>+91</Text>
                      </View>
                      <View style={styles.divider} />
                      <TextInput
                        ref={inputRef}
                        style={styles.textInput}
                        placeholder="Enter your 10-digit number"
                        keyboardType="number-pad"
                        placeholderTextColor={'#9CA3AF'}
                        cursorColor={'#111827'}
                        maxLength={10}
                        value={phoneNumber}
                        onChangeText={handlePhoneNumberChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        returnKeyType="done"
                      />
                    </View>
                  </TouchableOpacity>

                  {errorMob ? (
                    <Text style={styles.errorText}>{errorMob}</Text>
                  ) : null}
                </Animated.View>
              </Animated.View>

              <TouchableOpacity
                style={[styles.button, !isValidPhone && styles.buttonDisabled]}
                onPress={handleGetOtp}
                disabled={!isValidPhone}
                activeOpacity={0.9}
                accessibilityRole="button"
                accessibilityLabel="Send OTP"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    !isValidPhone && styles.buttonTextDisabled,
                  ]}
                >
                  Send OTP
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.termsText}>
                  By proceeding, you agree to FarmerPay’s{'\n'}
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
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    minHeight: 220,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  formContainer: {
    minHeight: 380,
    justifyContent: 'space-between',
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#E5E7EB', // gray-200
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      android: {
        elevation: 18,
        shadowColor: '#000',
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
    }),
    marginBottom: -18,
  },

  formContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 18,
    gap: 14,
  },

  title: {
    fontFamily: FONT,
    fontSize: 26,
    lineHeight: 32,
    color: '#111827', // gray-900
  },
  subtitle: {
    fontFamily: FONT,
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563', // gray-600
    marginTop: 2,
    marginBottom: 12,
  },

  inputBlock: {
    paddingHorizontal: 14,
    paddingTop: 2,
    borderWidth: 1.5,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontFamily: FONT,
    fontSize: 12,
    lineHeight: 16,
    color: '#111827',
    paddingVertical: 12,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },

  ccBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 8,
  },
  ccText: {
    fontFamily: FONT,
    fontSize: 14,
    lineHeight: 20,
    color: '#374151', // gray-700
  },

  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },

  textInput: {
    flex: 1,
    fontFamily: FONT,
    fontSize: 16,
    lineHeight: 22,
    color: '#111827',
    paddingVertical: 0,
  },

  errorText: {
    fontFamily: FONT,
    color: '#DC2626', // red-600
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
    marginBottom: 10,
    paddingHorizontal: 2,
  },

  button: {
    backgroundColor: '#6C47FF',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#6C47FF',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: '#EAEAEA',
    ...Platform.select({
      android: { elevation: 0 },
      ios: {
        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  buttonText: {
    fontFamily: FONT,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  buttonTextDisabled: {
    color: '#A2A2A2',
  },

  termsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    paddingBottom: 40,
  },
  termsText: {
    fontFamily: FONT,
    fontSize: 12,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    fontFamily: FONT,
    color: '#6C47FF',
    textDecorationLine: 'underline',
  },
});

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import Call from "../../assets/images/Call.svg";
// import axios from 'axios';
// import { BASE_URL } from '../../utils/api';
// import LargeButton from '../../utils/customs/LargeButton';

// const{width,height}=Dimensions.get('window');

// const LoginScreen = ({navigation}:any) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [errorMob, setError]= useState('');

//   const handleGetOtp = async () => {
//     const isValid = /^[6-9]\d{9}$/.test(phoneNumber);
//     if (!isValid) {
//       setError('Please enter a valid 10-digit Indian mobile number.')
//       return;
//     }
//     setError('');
//     try {
//       const payload = {
//         mobile: `${phoneNumber}`, // Ensure it matches the server-side expectation
//       };
//       console.log("Payload being sent:", payload);

//       const response = await axios.post(`${BASE_URL}/auth/send-otp`, payload);
//       console.log("OTP Sent:", response.data);
//       navigation.navigate('OtpScreen', { mobile: phoneNumber });

//       // proceed with navigation or OTP screen
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         console.log("Server error response:", err.response?.data);
//         Alert.alert("Error", err.response?.data?.message || "Something went wrong.");
//       } else {
//         console.log("Unknown error:", (err as Error).message);
//         Alert.alert("Network Error", "Please check your internet.");
//       }
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Top illustration */}
//       <Image
//         source={require('../../assets/images/farm-cow.png')} // Replace with your own image
//         style={styles.image}
//         resizeMode="contain"
//       />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={styles.formContainer}
//       >
//         {/* Heading */}
//         <View style={styles.header}>
//           <Text style={styles.title}>Log In</Text>
//           <Text style={styles.subtitle}>Welcome back to the app</Text>
//           <View style={styles.horizontalLine} />
//         </View>

//         {/* Phone Input */}
//         <View style={styles.inputBlock}>
//           <Text style={styles.label}>Enter Contact Number</Text>
//           <View             style={[
//                     styles.input,
//                     { borderColor: errorMob ? "#FB3748" : "#F2F2F2" }
//                   ]}>
//           <Call/>
//           <TextInput
//             placeholder="Enter your mobile number"
//             placeholderTextColor="#C0C0C0"

//             keyboardType="phone-pad"
//             maxLength={10}
//             onChangeText={  (text) => {
//                             setPhoneNumber(text);
//                           }}
//             value={phoneNumber}
//           />
//           </View>
//           {errorMob && <Text style={{color:'#FB3748' ,fontSize:10,marginTop:2}}>{errorMob}</Text>}
//           <Text style={styles.helperText}>We will send you an OTP on this number</Text>
//         </View>

//         {/* Get OTP Button */}
//         <LargeButton title="Get OTP" onPress={handleGetOtp} />

//         {/* Terms */}
//         <TouchableOpacity>
//           <Text style={styles.termsText}>
//             By proceeding you are agreeing to farmerpay’s{' '}
//             <Text style={styles.link}>Terms & Conditions</Text></Text>

//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </ScrollView>
//   );
// };

// export default LoginScreen;
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FDFDFD',
//     alignItems: 'center',
//   },
//   image: {
//     width: width*0.7,
//     aspectRatio:1,
//     marginTop: 16,
//   },
//   formContainer: {
//     width: '100%',
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   header: {
//     width: '80%',
//     marginBottom: 16,
//     flexDirection:'column',
//     flexWrap:'wrap',
//     alignSelf:'flex-start'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#3F1976',
//   },
//   horizontalLine: {
//     width: '100%',
//     height: 1,
//     backgroundColor: '#D3D3D3', // light grey
//     marginTop: 16, // space above & below the line
//     },
//   subtitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#4B5768',
//     marginTop: 4,
//   },
//   inputBlock: {
//     width: '100%',
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 8,
//     color: 'rgba(18, 18, 18, 0.87)',
//   },
//   input: {
//     borderWidth: 2,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     flexDirection:'row',
//     gap:6,
//     alignItems:'center',
//     height: 48,
//     fontSize: 12,
//     backgroundColor: '#FFFFFF',
//     color: '#000000',
//   },
//   helperText: {
//     fontSize: 10,
//     color: '#A2A2A2',
//     alignSelf:'flex-start',
//     marginTop: 8,
//     fontWeight: '600',
//   },
//   button: {
//     backgroundColor: '#6929C4',
//     borderRadius: 48,
//     height: 60,
//     minWidth: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   termsText: {
//     fontSize: 12,
//     color: '#000000',
//     textAlign: 'center',
//   },
//   link: {
//     color: '#54219D',
//   },
// });
