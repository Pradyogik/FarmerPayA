import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
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
import CustomCheckBox from '../../../utils/customs/checkBoxCompo';
import { useActivez } from '../../../context/ActiveContext';
const PersonalIntrests = ({ navigation }: any) => {
  const {activez,setActivez}= useActivez();
  const [active, setActive] = useState({
    travel: false,
    mobileElectronics: false,
    fashionClothing: false,
    onlineGaming: false,
    entertainment: false,
    food: false,
    healthWellness: false,
    dailyNeeds: false,
    beautyPersonalCare: false,
    wealthManagement: false,
    learningEducation: false,
    others: false,
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
            Personal Interests
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
          paddingBottom: 0,
          justifyContent: 'space-between',
        }}
      >
        <ScrollView contentContainerStyle={{ gap: 32 }} showsVerticalScrollIndicator={false}>
          <View>
            <View style={{ gap: 24 }}>
              <CustomText weight={500} size={12} lineHeight={18}>
                This information will be used for personalizing your experience
                & services across Farmerpay platform
              </CustomText>
              <CustomText weight={600} color="#1F077A">
                Which of the following categories do you have an interest in?
              </CustomText>
            </View>
            <View style={{ marginTop: 32, gap: 8 }}>
              <CustomCheckBox
                content={'Travel'}
                active={active.travel}
                onPress={() =>
                  setActive({
                    ...active,
                    travel: !active.travel,
                  })
                }
              />
              <CustomCheckBox
                content={'Mobile & Electronics'}
                active={active.mobileElectronics}
                onPress={() =>
                  setActive({
                    ...active,
                    mobileElectronics: !active.mobileElectronics,
                  })
                }
              />
              <CustomCheckBox
                content={'Fashion & Clothing'}
                active={active.fashionClothing}
                onPress={() =>
                  setActive({
                    ...active,
                    fashionClothing: !active.fashionClothing,
                  })
                }
              />
              <CustomCheckBox
                content={'Online Gaming '}
                active={active.onlineGaming}
                onPress={() =>
                  setActive({
                    ...active,
                    onlineGaming: !active.onlineGaming,
                  })
                }
              />
              <CustomCheckBox
                content={'Entertainment'}
                active={active.entertainment}
                onPress={() =>
                  setActive({
                    ...active,
                    entertainment: !active.entertainment,
                  })
                }
              />
              <CustomCheckBox
                content={'Food'}
                active={active.food}
                onPress={() =>
                  setActive({
                    ...active,
                    food: !active.food,
                  })
                }
              />
              <CustomCheckBox
                content={'Health & Wellness'}
                active={active.healthWellness}
                onPress={() =>
                  setActive({
                    ...active,
                    healthWellness: !active.healthWellness,
                  })
                }
              />
              <CustomCheckBox
                content={'Daily Needs'}
                active={active.dailyNeeds}
                onPress={() =>
                  setActive({
                    ...active,
                    dailyNeeds: !active.dailyNeeds,
                  })
                }
              />
              <CustomCheckBox
                content={'Beauty & Personal Care'}
                active={active.beautyPersonalCare}
                onPress={() =>
                  setActive({
                    ...active,
                    beautyPersonalCare: !active.beautyPersonalCare,
                  })
                }
              />
              <CustomCheckBox
                content={'Wealth Management'}
                active={active.wealthManagement}
                onPress={() =>
                  setActive({
                    ...active,
                    wealthManagement: !active.wealthManagement,
                  })
                }
              />
              <CustomCheckBox
                content={'Learning & Education'}
                active={active.learningEducation}
                onPress={() =>
                  setActive({
                    ...active,
                    learningEducation: !active.learningEducation,
                  })
                }
              />
              <CustomCheckBox
                content={'Others'}
                active={active.others}
                onPress={() =>
                  setActive({
                    ...active,
                    others: !active.others,
                  })
                }
              />
            </View>
          </View>
          <View>
            <LargeButton
              title="Complete"
              onPress={() => {
                if (!isAnySelected) {
                  Alert.alert('Please select at least one interest.');
                  return;
                }
                setActivez({...activez, personalIntrests: true});
                navigation.replace('addMissingDetails1');
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
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default PersonalIntrests;
