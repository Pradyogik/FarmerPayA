import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');
import BackArrow from '../../../assets/images/Profile/backArrow.svg';
import InfoIcon from '../../../assets/images/Profile/infoIcon.svg';
import CustomText from '../../../utils/customs/customText';
import Radio from '../../../utils/customs/radioCompo';
import CustomRadio from '../../../utils/customs/radioCompo';
import LargeButton from '../../../utils/customs/LargeButton';
import LargeWhiteButton from '../../../utils/customs/LargeWhiteButton';
import { useActivez } from '../../../context/ActiveContext';
const MaritalStatus = ({ navigation }: any) => {
  const {activez ,setActivez} =useActivez();
  const [active, setActive] = useState({
    Single: false,
    Married: false,
    Other: false,
  });
  const isAnySelected = Object.values(active).some(Boolean);
  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1, paddingTop: StatusBar.currentHeight || 40 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          alignItems: 'center',
          elevation: 4,
          shadowColor: '#fff',
          height: height * 0.08,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: '#fff' }}>Marital Status</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderTopStartRadius: 32,
          borderTopEndRadius: 32,
          backgroundColor: '#fff',
          padding: 16,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View style={{ gap: 24 }}>
            <CustomText weight={500} size={12} lineHeight={18}>
              This information will be used for personalizing your experience &
              services across Farmerpay platform
            </CustomText>
            <CustomText weight={600} color="#1F077A">
              What is your current marital status?
            </CustomText>
          </View>
          <View style={{ marginTop: 32, gap: 8 }}>
            <CustomRadio
              content={'Single'}
              active={active.Single}
              onPress={() =>
                setActive({ Single: true, Married: false, Other: false })
              }
            />
            <CustomRadio
              content={'Married'}
              active={active.Married}
              onPress={() =>
                setActive({ Single: false, Married: true, Other: false })
              }
            />
            <CustomRadio
              content={'Other'}
              active={active.Other}
              onPress={() =>
                setActive({ Single: false, Married: false, Other: true })
              }
            />
          </View>
        </View>
        <View>
          <LargeButton
            title="Next"
            onPress={() => {
              if (!isAnySelected) {
                Alert.alert('Please select at least one interest.');
                return;
              }
              setActivez({...activez,maritalStatus:true});
              navigation.replace('educationStatus');
            }}
            width={width - 60}
          />
          <LargeWhiteButton
            title="Cancel"
            onPress={() => {
              navigation.goBack();
            }}
            width={width - 60}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default MaritalStatus;
