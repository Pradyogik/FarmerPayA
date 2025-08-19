import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/signup-image.png')} // <-- put your image here
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create your account to continue</Text>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Link to Aadhar KYC</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.secondaryButton} onPress={()=>{navigation.navigate('SignUpForm1')}}>
        <Text style={styles.secondaryButtonText}>Enter Manually</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    backgroundColor: '#fff',
  },
  image: {
    alignSelf:'center',
    width: width * 0.8,
    aspectRatio:1.23,   
   
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4B0082', // deep purple
    textAlign:'left',
    marginTop: 24,
  },
  subtitle: {
    textAlign:'left',
    fontSize: 14,
    color: '#555',
    marginVertical: 12,
    
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#5E2B97',
    paddingVertical: 16,
    borderRadius: 32,
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  orText: {
    marginVertical: 32,
    textAlign:'center',
    fontSize: 14,
    color: '#333',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: '#5E2B97',
  },
  secondaryButtonText: {
    color: '#5E2B97',
    fontSize: 16,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    marginTop: 24,
  },
  loginText: {
    color: '#28a745', // green link
    fontWeight: '500',
  },
});

export default SignUpScreen;
