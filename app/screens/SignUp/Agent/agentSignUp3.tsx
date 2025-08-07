import React, { useEffect, useState } from 'react';
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
  Alert,
} from 'react-native';

import GpsIcon from '../../../assets/images/GpsIcon.svg';
import VillageIcon from '../../../assets/images/VillageIcon.svg';
import StateIcon from '../../../assets/images/StateIcon.svg';
import ArrowBack from '../../../assets/images/ArrowBack.svg';
import HomeIcon from '../../../assets/images/HomeIcon.svg';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';
import { KeyboardTypeOptions } from 'react-native';
import LargeButton from '../../../utils/customs/LargeButton';

interface FormData {
  houseNo?: string;
  villageName?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const AgentSignUp3 = ({ navigation }: any) => {
    const route = useRoute<any>();
    const {
      user_id,
      mobile,
      house_no,
      village_or_town,
      city_or_district,
      pincode,
      state,
      same_as_permanent 
    } = route.params;

    const [ formData , setFormData ] = useState({
          houseNo: '',
          villageName: '',
          city: '',
          state: '',
          pincode: '',
    })
    const [checked, setChecked] = useState(false);
    //const route = useRoute<any>();

    useEffect(() => {
      if (same_as_permanent) {
        setChecked(true);
        setFormData({
          houseNo: house_no,
          villageName: village_or_town,
          city: city_or_district,
          state: state,
          pincode: pincode,
        });
      } 
    }, []);

  const handleSubmit = async () => {
    const { houseNo, villageName, city, state, pincode } = formData;

    if (!houseNo || !villageName || !city || !state || !pincode) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    try {
      const payload = {
        user_id,
        house_no: houseNo,
        village_or_town: villageName,
        city_or_district: city,
        pincode,
        state,
      };

      console.log('Sending /corraddress:', payload);

      const response = await axios.post(`${BASE_URL}/agent/corraddress`, payload);

      console.log('Correspondence address submitted:', response.data);

      navigation.navigate('UploadDocumentsScreen', { user_id, mobile });
    } catch (error: any) {
      console.error('Failed to submit corr address:', error);
      Alert.alert('Error', error?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: 40 }}>
        <ArrowBack />
      </Pressable>

      <Text style={styles.label0}>Correspondance  Address</Text>

            {/* Checkbox */}
          <View style={styles.formContainer}>

            {/* Inputs */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter House Number</Text>
              <View style={styles.inputBox}>
                <HomeIcon height={20} width={20} color={'#A0A0A0'} />
                <TextInput
                  placeholder="Enter your house, flat, apartment no."
                  style={styles.input}
                  placeholderTextColor="#C0C0C0"
                  value={formData.houseNo}
                />
              </View>
            </View>
          

            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter Village</Text>
              <View style={styles.inputBox}>
                <VillageIcon height={25} width={25} color={'#A0A0A0'} />
                <TextInput
                  placeholder="Enter your village/town name"
                  style={styles.input}
                  placeholderTextColor="#C0C0C0"
                  value={formData.villageName}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter City/District Name</Text>
              <View style={styles.inputBox}>
                <VillageIcon height={25} width={25} fill="#A0A0A0" />
                <TextInput
                  placeholder="Choose your city"
                  style={styles.input}
                  placeholderTextColor="#C0C0C0"
                  value={formData.city}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter Pincode</Text>
              <View style={styles.inputBox}>
                <GpsIcon height={25} width={25} fill="#A0A0A0" />
                <TextInput
                  placeholder="Turn on gps to drop precise pin"
                  style={styles.input}
                  placeholderTextColor="#C0C0C0"
                  value={formData.pincode}
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
                  value={formData.state} 
                />
              </View>
            </View>

            <View style={{ gap: 16 }}>
               <LargeButton title="Continue"  onPress={handleSubmit}/>
            </View>
          </View>
      </View>
    </ScrollView>
  );
};

export default AgentSignUp3;

const styles = StyleSheet.create({
  formContainer: {
    gap: 24,
   marginBottom: 24,
   marginTop:24
  },
  label0: {
    marginHorizontal: 22,
    //marginHorizontal: 24,
    color: '#797979',
    paddingTop: 20,
    fontSize: 14,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#fff'
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(18, 18, 18, 0.87)',
  },
  inputBox: {
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
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
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

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:6,
    marginHorizontal:32,
    gap: 8,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#54219D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#54219D',
  },
  innerTick: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#797979',
  },
});
