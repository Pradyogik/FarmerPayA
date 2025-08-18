import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/api';
import BackArrow from '../../assets/images/back-arrow.svg';
import LargeButton from '../../utils/customs/LargeButton';

export default function LoginOtpVerification({ navigation, route }: any) {
  const { mobile } = route.params;

  const onBackPress = () => {
    navigation.goBack();
  };

  return <OtpVerification onBackPress={onBackPress} navigation={navigation} mobile={mobile} />;
}

const OtpVerification = ({
  onBackPress,
  navigation,
  mobile,
}: {
  onBackPress: () => void;
  navigation: any;
  mobile: string;
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const [noerror, setnoError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const inputsRef = useRef<Array<TextInput | null>>([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      setActiveIndex(index + 1);
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      } else {
        inputsRef.current[index]?.blur();
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }: any, index: number) => {
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
          setActiveIndex(index - 1);
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        setActiveIndex(index);
      }
    }
  };

const handleVerify = async () => {
  const enteredOtp = otp.join('');

  if (enteredOtp.length < 6) {
    setError('Please enter all 6 digits.');
    setInfoMessage('');
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      mobile,
      otp: enteredOtp,
    });

    const {user_id } = response.data;

    console.log(' OTP Verified. user_id:', user_id);
    await AsyncStorage.setItem('user_id', user_id.toString());

    setError(''); 
    setInfoMessage('');
    console.log('mobile:', mobile);
    console.log('enteredOtp:', enteredOtp);

    try {
      const userRes = await axios.get(`${BASE_URL}/user/${user_id}`);

      console.log('📦 Full userRes.data from GET /user/:id →', userRes.data);

      console.log('✅ JSON stringified:', JSON.stringify(userRes.data));

      const user = Array.isArray(userRes.data) ? userRes.data[0] : null;
      const isRegistered = user?.is_registered === 1;

      console.log('🧾 is_registered:', user?.is_registered);

      if (isRegistered) {

        console.log('🚀 Navigating to Main screen...');
        setnoError('Navigating to Main screen...');
        navigation.navigate('Main', { mobile, user_id });
      } else {
        console.log('📝 User not registered yet. Navigating to WhoAreU...');
        setnoError('OTP verified. Let’s continue...');
        setTimeout(() => {
          setnoError('');
          navigation.navigate('WhoAreU', { mobile, user_id });
        }, 1000);
      }
    } catch (statusErr) {
      console.error('Error checking user status:', statusErr);
      setError('Failed to fetch user status. Try again.');
    }
  }catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('OTP error:', err.response?.data);
      setError(err.response?.data?.message || 'OTP verification failed.');
    } else {
      console.error('❌ Unknown error:', err);
      setError('Something went wrong.');
    }
  }
};


  const handleResend = async () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    setError('');
    setActiveIndex(0);
    inputsRef.current[0]?.focus();    

    try {
      const res = await axios.post(`${BASE_URL}/auth/send-otp`, { mobile });
      Alert.alert('OTP Resent', res.data.message || 'Check your messages');
    } catch (err) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackArrow/>
      </TouchableOpacity>

      <Text style={styles.label}>
        Enter the 6 digit code sent to your number
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => {
          const isActive = index === activeIndex;
          const isError = !!error;

          return (
            <TextInput
              key={index}
              ref={(ref) => {
                inputsRef.current[index] = ref;
              }}
              style={[
                styles.otpBox,
                isError
                  ? styles.otpBoxError
                  : isActive
                  ? styles.otpBoxActive
                  : styles.otpBoxInactive,
              ]}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
            />
          );
        })}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {noerror === 'OTP verified. Let’s continue...' ? (
        <Text style={styles.successText}>{noerror}</Text>
      ) : noerror ? (
        <Text style={styles.errorText}>{noerror}</Text>
      ) : null}

      {timer > 0 ? (
        <Text style={styles.resendText}>
          If you did not receive the OTP,{' '}
          <Text style={{ color: '#D00416' }}>Resend in {timer}s</Text>
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={[styles.resendText, { color: '#79BBA8' }]}>Resend OTP</Text>
        </TouchableOpacity>
      )}


      <LargeButton title="Verify"  onPress={ handleVerify}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#121212',
    marginTop: 40,
    marginBottom: 40,
    textAlign: 'left',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  otpBox: {
    width: 48,
    height: 70,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#797979',
    borderWidth: 2,
  },
  otpBoxActive: {
    borderColor: '#4CAF50',
  },
  otpBoxInactive: {
    borderColor: '#A2A2A2',
  },
  otpBoxError: {
    borderColor: '#D00416',
  },
  resendText: {
    fontSize: 12,
    color: '#0F1B38',
    textAlign: 'right',
    marginBottom: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 14,
    color: '#D00416',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 8,
  },
  verifyButton: {
    backgroundColor: '#6929C4',
    height: 60,
    borderRadius: 48,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop:40,
  },
  verifyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});