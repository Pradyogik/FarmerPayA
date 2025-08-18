import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import BackArrow from '../../assets/images/back-arrow.svg';

const FONT = 'Inter';
const PRIMARY = '#54219D';

export default function LoginOtpVerification({ navigation, route }: any) {
  const mobile: string = route?.params?.mobile ?? '';
  const onBackPress = () => navigation.goBack();

  return (
    <OtpVerification
      onBackPress={onBackPress}
      navigation={navigation}
      mobile={mobile}
    />
  );
}

function OtpVerification({
  onBackPress,
  navigation,
  mobile,
}: {
  onBackPress: () => void;
  navigation: any;
  mobile: string;
}) {
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const hiddenInputRef = useRef<TextInput | null>(null);

  const digits = Array.from({ length: 6 }, (_, i) => (code || '')[i] ?? '');
  const isComplete = (code || '').length === 6;

  useEffect(() => {
    const t = setTimeout(() => hiddenInputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const focusHidden = () => setTimeout(() => hiddenInputRef.current?.focus(), 10);

  const handleChangeCode = (text: string) => {
    const next = (text ?? '').replace(/\D/g, '').slice(0, 6);
    setError('');
    setSuccess('');
    setCode(next);
    // if (next.length === 6) handleVerify(next); // enable for auto-verify
  };

  const formatTime = (sec: number) => {
    const mm = Math.floor(sec / 60).toString().padStart(2, '0');
    const ss = (sec % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleVerify = async (value?: string) => {
    const entered = (value ?? code ?? '');
    if (entered.length !== 6 || verifying) return;

    setVerifying(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        mobile,
        otp: entered,
      });
      const { user_id } = response.data;

      try {
        const userRes = await axios.get(`${BASE_URL}/user/${user_id}`);
        const user = Array.isArray(userRes.data) ? userRes.data[0] : null;
        const isRegistered = user?.is_registered === 1;

        if (isRegistered) {
          navigation.navigate('Main', { mobile, user_id });
        } else {
          setSuccess('OTP verified. Let’s continue…');
          setTimeout(() => {
            setSuccess('');
            navigation.navigate('WhoAreU', { mobile, user_id });
          }, 900);
        }
      } catch (statusErr) {
        console.error('Error checking user status:', statusErr);
        setError('Failed to fetch user status. Try again.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('OTP error:', err.response?.data);
        setError(err.response?.data?.message || 'OTP verification failed.');
      } else {
        console.error('Unknown error:', err);
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    setCode('');
    setError('');
    setSuccess('');
    try {
      const res = await axios.post(`${BASE_URL}/auth/send-otp`, { mobile });
      Alert.alert('OTP Resent', res.data?.message || 'Check your messages');
      setTimer(30);
      focusHidden();
    } catch {
      Alert.alert('Error', 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" translucent={false} backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <BackArrow />
        </TouchableOpacity>

        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.caption}>
          Enter the 6-digit code sent to <Text style={styles.captionBold}>+91 {mobile}</Text>
        </Text>

        {/* OTP row wrapper (relative) */}
        <View style={styles.otpWrap}>
          {/* Hidden input overlays the row (on-screen, transparent, ignores touches) */}
          <TextInput
            ref={hiddenInputRef}
            value={code ?? ''}
            onChangeText={handleChangeCode}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            inputMode="numeric"
            maxLength={6}
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            importantForAutofill="yes"
            showSoftInputOnFocus={true}
            pointerEvents="none"
            style={styles.hiddenInput}
          />

          {/* Visual boxes (tap any to focus) */}
          <View style={styles.otpContainer}>
            {digits.map((ch, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={focusHidden}
                style={[styles.otpBox, error ? styles.otpBoxError : styles.otpBoxDefault]}
                accessibilityRole="button"
                accessibilityLabel={`OTP box ${idx + 1}`}
              >
                <Text style={styles.otpChar}>{ch || '-'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Timer / Resend */}
        <View style={styles.timerRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Didn’t get the code? <Text style={styles.timerStrong}>{formatTime(timer)}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} disabled={resending}>
              <Text style={[styles.resendLink, resending && styles.resendDisabled]}>
                {resending ? 'Resending…' : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        <TouchableOpacity
          onPress={() => handleVerify()}
          activeOpacity={0.9}
          disabled={!isComplete || verifying}
          style={[styles.button, (!isComplete || verifying) && styles.buttonDisabled]}
          accessibilityRole="button"
          accessibilityLabel="Verify OTP"
        >
          <Text
            style={[styles.buttonText, (!isComplete || verifying) && styles.buttonTextDisabled]}
          >
            {verifying ? 'Verifying…' : 'Verify'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },

  title: {
    fontFamily: FONT,
    fontSize: 22,
    lineHeight: 28,
    color: '#111827',
    fontWeight: '800',
    marginTop: 8,
  },
  caption: {
    fontFamily: FONT,
    fontSize: 13,
    lineHeight: 18,
    color: '#4B5563',
    marginTop: 6,
    marginBottom: 24,
  },
  captionBold: {
    fontFamily: FONT,
    fontSize: 13,
    lineHeight: 18,
    color: '#111827',
    fontWeight: '700',
  },

  // OTP row wrapper
  otpWrap: {
    position: 'relative',
    marginBottom: 12,
  },

  // Hidden input overlays the boxes area (visible to OS, transparent to user)
  hiddenInput: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 64,      // same as box height
    opacity: 0.02,   // nearly invisible but on-screen
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  otpBox: {
    flex: 1,
    minWidth: 44,
    maxWidth: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxDefault: { borderColor: '#D1D5DB' },
  otpBoxError: { borderColor: '#D00416' },
  otpChar: {
    fontFamily: FONT,
    fontSize: 20,
    color: '#111827',
  },

  timerRow: {
    marginTop: 10,
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  timerText: {
    fontFamily: FONT,
    fontSize: 12,
    color: '#0F1B38',
    fontWeight: '500',
  },
  timerStrong: {
    fontFamily: FONT,
    fontSize: 12,
    color: PRIMARY,
    fontWeight: '700',
  },
  resendLink: {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: '700',
    color: PRIMARY,
    textDecorationLine: 'underline',
  },
  resendDisabled: {
    color: '#9CA3AF',
    textDecorationLine: 'none',
  },

  errorText: {
    fontFamily: FONT,
    fontSize: 12,
    color: '#D00416',
    marginTop: 4,
  },
  successText: {
    fontFamily: FONT,
    fontSize: 12,
    color: '#16A34A',
    marginTop: 4,
  },

  button: {
    backgroundColor: PRIMARY,
    height: 56,
    borderRadius: 48,
    width: '92%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 24,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: PRIMARY,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: '#E6DFF7',
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
    color: '#000000',
  },
});
