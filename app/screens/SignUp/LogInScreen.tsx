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

  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateFocus = (focused: boolean) => {

    Animated.timing(borderColorAnim, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

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

          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/farm-cow.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>


          <View style={styles.formContainer}>
            <View style={styles.formContent}>
              <Text style={styles.title}>Log In</Text>
              <Text style={styles.subtitle}>
                We will send an OTP to this number for verification
              </Text>

              <TouchableOpacity
                style={[
                  styles.inputBlock,
                  isInputFocused && styles.inputBlockFocused,
                ]}
                onPress={handleInputBlockPress}
                activeOpacity={1}
              >
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
                {errorMob ? (
                  <Text style={styles.errorText}>{errorMob}</Text>
                ) : null}
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
    flex: 1,
    minHeight: 200, 
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    minHeight: 350,
    justifyContent: 'space-between', 
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderWidth: 1,
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
    marginBottom: -18,
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
    borderColor: '#6929C4', 
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
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
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
