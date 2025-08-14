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
import { Navigation } from 'lucide-react-native';
import LargeButton from '../../../utils/customs/LargeButton';
import LargeWhiteButton from '../../../utils/customs/LargeWhiteButton';
import { useActivez } from '../../../context/ActiveContext';
const InternationalTravel = ({ navigation }: any) => {
  const {activez,setActivez} =useActivez();
  const [active, setActive] = useState({
    threeMonth: false,
    sixMonth: false,
    yearly: false,
    fiveYear: false,
    IDoNotTravel: false,
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
          <Text style={{ fontSize: 16, color: '#fff' }}>
            International Travel
          </Text>
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
              How often do you travel internationally?
            </CustomText>
          </View>
          <View style={{ marginTop: 32, gap: 8 }}>
            <CustomRadio
              content={'Once in 3 Months'}
              active={active.threeMonth}
              onPress={() =>
                setActive({
                  threeMonth: true,
                  sixMonth: false,
                  yearly: false,
                  fiveYear: false,
                  IDoNotTravel: false,
                })
              }
            />
            <CustomRadio
              content={'Once in 6 Month'}
              active={active.sixMonth}
              onPress={() =>
                setActive({
                  threeMonth: false,
                  sixMonth: true,
                  yearly: false,
                  fiveYear: false,
                  IDoNotTravel: false,
                })
              }
            />
            <CustomRadio
              content={'Once in a year'}
              active={active.yearly}
              onPress={() =>
                setActive({
                  threeMonth: false,
                  sixMonth: false,
                  yearly: true,
                  fiveYear: false,
                  IDoNotTravel: false,
                })
              }
            />
            <CustomRadio
              content={'Once in 5 years'}
              active={active.fiveYear}
              onPress={() =>
                setActive({
                  threeMonth: false,
                  sixMonth: false,
                  yearly: false,
                  fiveYear: true,
                  IDoNotTravel: false,
                })
              }
            />

            <CustomRadio
              content={'I do not travel internationally'}
              active={active.IDoNotTravel}
              onPress={() =>
                setActive({
                  threeMonth: false,
                  sixMonth: false,
                  yearly: false,
                  fiveYear: false,
                  IDoNotTravel: true,
                })
              }
            />
          </View>
        </View>
        <View>
          <LargeButton
            title="Next"
            onPress={() => {
              if (!isAnySelected) {
                Alert.alert('Please select from the options.');
                return;
              }
              setActivez({...activez,internationalTravel:true});
              navigation.replace('personalInterests');
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

export default InternationalTravel;
