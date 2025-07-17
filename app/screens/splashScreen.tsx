// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');


const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Splash2'); // Change 'Home' to your actual main screen
    }, 6000); // 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);


  const handleGetStarted = () => {
    navigation.navigate('Splash2'); // Manual navigation
  };


  return (
    <ImageBackground
      source={require('../assets/images/farmer_splash_bg.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoWrapper: {
    top:16,
    height: height * 0.13,
    alignSelf: 'center',
  },
  logo: {
    width: 230,
    height: 230,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: width * 0.88,
    height: 60,
    backgroundColor: '#54219D',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
});

export default SplashScreen;
