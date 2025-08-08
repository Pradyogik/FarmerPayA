import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
} from 'react-native';

import VillageIcon from '../../../assets/images/VillageIcon.svg';
import StateIcon from '../../../assets/images/StateIcon.svg';
import ArrowBack from '../../../assets/images/ArrowBack.svg';
import GpsIcon from '../../../assets/images/GpsIcon.svg';

const SignUpFormScreen2 = ({ navigation }: any) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 ,paddingTop:40,backgroundColor:'#fff'}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
        <Pressable onPress={()=>{navigation.goBack()}} style={{marginHorizontal:24}}>
         <ArrowBack/>
        </Pressable>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
          

            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter Village</Text>
              <View style={styles.inputBox}>  
               <VillageIcon height={25} width={25} color={'#A0A0A0'}/> 
              <TextInput
                placeholder="Enter your village/town name"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              /></View>

            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter City/District Name</Text>
              <View style={styles.inputBox}>
              <VillageIcon height={25} width={25} fill='#A0A0A0'/> 
              <TextInput
                placeholder="Choose your city"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              />
              </View>
            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter PINCODE</Text>
              <View style={styles.inputBox}>
              <GpsIcon height={25} width={25} fill='#A0A0A0'/> 
              <TextInput
                placeholder="Turn on gps to drop precise pin"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              />
              </View>
            </View>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter State</Text>
              <View style={styles.inputBox}>
              <StateIcon height={25} width={25} />
              <TextInput
                placeholder="Choose your state"
                style={styles.input}
                placeholderTextColor="#C0C0C0"
              />
              </View>
            </View>
           <View style={{gap:16}}>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('primaryRole')}}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                Log in
              </Text>
            </Text></View>
           </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop:40,
    padding: 24,
  },
  container: {
    flex: 1,
  
    gap:24
  },
  formGroup: {
    
    gap:8
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(18, 18, 18, 0.87)',
  },
  inputBox:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  button: {
    height: 60,
    backgroundColor: '#6929C4',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    color: '#000000',
    
  },
  loginLink: {
    color: '#79BBA8',
    fontWeight: '500',
  },
});

export default SignUpFormScreen2;
