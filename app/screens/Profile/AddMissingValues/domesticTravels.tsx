import React, { useState } from 'react';
import {
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
const DomesticTravel = ({ navigation }: any) => {
  const [active, setActive] = useState({
    EveryWeek: false,
    EveryMonth: false,
    Every3Months: false,
    Every6Months: false,
    Annualy: false,
    IDoNotTravel: false,
  });
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
          <Text style={{ fontSize: 16, color: '#fff' }}>Domestic Travel</Text>
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
              How often do you travel domestically?
            </CustomText>
          </View>
          <View style={{ marginTop: 32, gap: 8 }}>
            <CustomRadio
              content={'Every Week '}
              active={active.EveryWeek}
              onPress={() =>
                setActive({
                  EveryWeek: true,
                  EveryMonth: false,
                  Every3Months: false,
                  Every6Months: false,
                  Annualy: false,
                  IDoNotTravel: false,
                })
              }
            />
            <CustomRadio
              content={'Every Month'}
              active={active.EveryMonth}
              onPress={() =>
                setActive({
                  EveryWeek: false,
                  EveryMonth: true,
                  Every3Months: false,
                  Every6Months: false,
                  Annualy: false,
                  IDoNotTravel: false,
                })
              }
            />
            <CustomRadio
              content={'Every 3 Months'}
              active={active.Every3Months}
              onPress={() =>
                setActive({
                  EveryWeek: false,
                  EveryMonth: false,
                  Every3Months: true,
                  Every6Months: false,
                  Annualy: false,
                  IDoNotTravel: false,
                })
              }
            />
            <CustomRadio
              content={'Every 6 Months'}
              active={active.Every6Months}
              onPress={() =>
                setActive({
                  EveryWeek: false,
                  EveryMonth: false,
                  Every3Months: false,
                  Every6Months: true,
                  Annualy: false,
                  IDoNotTravel: false,
                })
              }
            />
            <CustomRadio
              content={'Annualy'}
              active={active.Annualy}
              onPress={() =>
                setActive({
                  EveryWeek: false,
                  EveryMonth: false,
                  Every3Months: false,
                  Every6Months: false,
                  Annualy: true,
                  IDoNotTravel: false,
                })
              }
            />
            <CustomRadio
              content={'I do not Travel'}
              active={active.IDoNotTravel}
              onPress={() =>
                setActive({
                  EveryWeek: false,
                  EveryMonth: false,
                  Every3Months: false,
                  Every6Months: false,
                  Annualy: false,
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
              navigation.navigate('internationalTravel');
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

export default DomesticTravel;
