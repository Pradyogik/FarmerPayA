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
import CustomCheckBox from '../../../utils/customs/checkBoxCompo';
import { useActivez } from '../../../context/ActiveContext';
const FamilyMembers = ({ navigation }: any) => {
  const {activez,setActivez}=useActivez();
  const [active, setActive] = useState({
    Spouse: false,
    Children: false,
    ParentsInLaw: false,
    Siblings: false,
    freinds: false,
    Others: false,
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
          <Text style={{ fontSize: 16, color: '#fff' }}>Family Members</Text>
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
              Who do you live with?
            </CustomText>
          </View>
          <View style={{ marginTop: 32, gap: 8 }}>
            <CustomCheckBox
              content={'Spouse'}
              active={active.Spouse}
              onPress={() =>
                setActive({
                  ...active,
                  Spouse: !active.Spouse,
                })
              }
            />
            <CustomCheckBox
              content={'Children'}
              active={active.Children}
              onPress={() =>
                setActive({
                  ...active,
                  Children: !active.Children,
                })
              }
            />
            <CustomCheckBox
              content={'Parents /In Laws'}
              active={active.ParentsInLaw}
              onPress={() =>
                setActive({
                  ...active,
                  ParentsInLaw: !active.ParentsInLaw,
                })
              }
            />
            <CustomCheckBox
              content={'Siblings'}
              active={active.Siblings}
              onPress={() =>
                setActive({
                  ...active,
                  Siblings: !active.Siblings,
                })
              }
            />
            <CustomCheckBox
              content={'Freinds'}
              active={active.freinds}
              onPress={() =>
                setActive({
                  ...active,
                  freinds: !active.freinds,
                })
              }
            />
            <CustomCheckBox
              content={'Others'}
              active={active.Others}
              onPress={() =>
                setActive({
                  ...active,
                  Others: !active.Others,
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
                Alert.alert('Please select at least one option.');
                return;
              }
              setActivez({...activez,familyMembers:true});
              navigation.replace('domesticTravel');
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

export default FamilyMembers;
