// ChoosePersonaScreen.tsx
import React, { useState }  from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import LargeButton from '../../utils/customs/LargeButton';
import LargeWhiteButton from '../../utils/customs/LargeWhiteButton';
import BankFarmer from '../../assets/images/BankFarmer.svg'
import axios from 'axios';
import { BASE_URL } from '../../utils/api';

const WhoAreUScreen = ({navigation,route }:any) => {
  const { user_id, mobile } = route.params;
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = async(roleName:string)=>{
    try{
      const response = await axios.post(`${BASE_URL}/role/`,{
        name : roleName,
        user_id,
      });
      console.log('Role assigned:', response.data);
      if(roleName === 'agent'){
        navigation.navigate('AgentSignUp1', { user_id, mobile });
      }else{
        navigation.navigate('SignUpForm1', { user_id, mobile });
      }
    }catch (error){
      console.log('Sending role assignment payload:', {
        name: roleName,
        user_id,
        });

      console.error('Error assigningn role : ', error);
      setErrorMessage('Failed to assign role. Please try again.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* SVG Icons */}
      <View style={styles.iconContainer}>
        <BankFarmer/>
      </View>
    
      {/* Heading */}
      <View style={styles.textBox}>
        <Text style={styles.title}>Get Started with FarmerPay</Text>
        <Text style={styles.subtitle}>Please select your user type to continue. </Text>
      </View>

      {/* Buttons */}
      <LargeButton title="I’m a Bank / CSC Agent" 
        onPress={()=> handleRoleSelect('agent')}
      />

      <Text style={styles.orText}>OR</Text>

      <LargeWhiteButton title="I’m a Farmer" 
        onPress={()=> handleRoleSelect('farmer')}
      />
       
      {errorMessage !== '' && (
  <Text style={styles.errorText}>{errorMessage}</Text>
)}
    </SafeAreaView>
  );
};

export default WhoAreUScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  textBox: {
    
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    paddingRight:12,
    fontWeight: '700',
    color: '#3F1976',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5768',
    marginTop: 12,
    textAlign: 'left',
  },
  primaryButton: {
    width: '90%',
    height: 60,
    backgroundColor: '#6929C4',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  primaryText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  orText: {
    fontSize: 20,
    marginVertical: 12,
    fontWeight: '500',
    color: '#000',
  },
  secondaryButton: {
    width: '90%',
    height: 60,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#54219D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: 16,
    color: '#54219D',
    fontWeight: '500',
  },
  errorText: {
  color: 'red',
  textAlign: 'right',
  marginTop: 10,
  marginRight: 10,
  fontSize: 14,
},

});
