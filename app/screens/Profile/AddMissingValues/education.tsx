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
const EducationStatus = ({ navigation }: any) => {
  const {activez, setActivez} = useActivez();
  const [active, setActive] = useState({
    PostGraduate: false,
    Graduate: false,
    twelth: false,
    tenth: false,
    primary: false,
    noFormal: false,
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
          <Text style={{ fontSize: 16, color: '#fff' }}>Education</Text>
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
              What is your highest education?
            </CustomText>
          </View>
          <View style={{ marginTop: 32, gap: 8 }}>
            <CustomRadio
              content={'Post Graduate'}
              active={active.PostGraduate}
              onPress={() =>
                setActive({
                  PostGraduate: true,
                  Graduate: false,
                  twelth: false,
                  tenth: false,
                  primary: false,
                  noFormal: false,
                })
              }
            />
            <CustomRadio
              content={'Graduate'}
              active={active.Graduate}
              onPress={() =>
                setActive({
                  PostGraduate: false,
                  Graduate: true,
                  twelth: false,
                  tenth: false,
                  primary: false,
                  noFormal: false,
                })
              }
            />
            <CustomRadio
              content={'12th Grade'}
              active={active.twelth}
              onPress={() =>
                setActive({
                  PostGraduate: false,
                  Graduate: false,
                  twelth: true,
                  tenth: false,
                  primary: false,
                  noFormal: false,
                })
              }
            />
            <CustomRadio
              content={'10th Grade'}
              active={active.tenth}
              onPress={() =>
                setActive({
                  PostGraduate: false,
                  Graduate: false,
                  twelth: false,
                  tenth: true,
                  primary: false,
                  noFormal: false,
                })
              }
            />
            <CustomRadio
              content={'Primary (10th Grade)'}
              active={active.primary}
              onPress={() =>
                setActive({
                  PostGraduate: false,
                  Graduate: false,
                  twelth: false,
                  tenth: false,
                  primary: true,
                  noFormal: false,
                })
              }
            />
            <CustomRadio
              content={'No Formal Schooling'}
              active={active.noFormal}
              onPress={() =>
                setActive({
                  PostGraduate: false,
                  Graduate: false,
                  twelth: false,
                  tenth: false,
                  primary: false,
                  noFormal: true,
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
                Alert.alert('Please select from the Options.');
                return;
              }
              setActivez({...activez,education:true});
              navigation.replace('familyMembers');
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

export default EducationStatus;
