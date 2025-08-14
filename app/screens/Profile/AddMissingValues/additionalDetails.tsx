import React, { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');
import BackArrow from '../../../assets/images/Profile/backArrow.svg';
import InfoIcon from '../../../assets/images/Icons/threeDot.svg';
import CustomText from '../../../utils/customs/customText';
import UpArrow from '../../../assets/images/Icons/upArrow.svg';
import DownArrow from '../../../assets/images/Icons/downArrow.svg';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native';
import { Navigation } from 'lucide-react-native';
import MaritalStatus from './maritalstatus';
import DomesticTravel from './domesticTravels';
import ThreeDotsVertical from '../../../utils/customs/IconsCompo/ThreeDotVertical';
import { useActivez } from '../../../context/ActiveContext';

interface ItemsProps {
  title: string;
  subTitle: string;
  onPress?: () => void;
  navigation?: any;
  active?: boolean;
}
const Item: React.FC<ItemsProps> = ({
  title,
  subTitle,
  onPress,
  navigation,
  active = false,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <View style={{ flexDirection: 'column', position: 'relative' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'column' }}>
          <CustomText weight={500} size={14} lineHeight={21}>
            {title}
          </CustomText>
          <View style={{ maxWidth: width - 132 }}>
            <CustomText color="#656F77" size={12} lineHeight={18}>
              {subTitle}
            </CustomText>
          </View>
        </View>

        {active ? (
          <TouchableOpacity onPress={toggleMenu}>
            <ThreeDotsVertical color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onPress}
            style={{
              borderColor: '#54219D',
              borderRadius: 48,
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderWidth: 2,
            }}
          >
            <CustomText color="#54219D" weight={500} size={12} lineHeight={18}>
              Add
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: '#DEDEDE',
          width: width - 32,
          alignSelf: 'center',
          marginVertical: 10,
        }}
      />

      {/* Floating Menu */}
      {isMenuOpen && (
        <View
          style={{
            position: 'absolute',
            top: 25,
            right: 0,
            backgroundColor: '#fff',
            borderRadius: 8,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            paddingVertical: 8,
            width: 120,
            zIndex: 1000,
          }}
        >
          <TouchableOpacity
            style={{ paddingVertical: 8, paddingHorizontal: 12 }}
            onPress={() => {
              setMenuOpen(false);
              console.log('Edit pressed');
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingVertical: 8, paddingHorizontal: 12 }}
            onPress={() => {
              setMenuOpen(false);
              console.log('Delete pressed');
            }}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};


const AdditionalDetailScreen = ({ navigation }: any) => {
  const [drop1, setDropActive1] = useState(true);
  const [drop2, setDropActive2] = useState(true);
   const { activez, setActivez } = useActivez();
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
          <TouchableOpacity onPress={() => navigation.goBack()}><BackArrow /></TouchableOpacity>
          <CustomText color={'#fff'}>Additional Details</CustomText>
        </View>
        <InfoIcon />
      </View>
      <View
        style={{
          flex: 1,
          borderTopStartRadius: 32,
          borderTopEndRadius: 32,
          paddingTop:8,
          backgroundColor: '#FDFDFD',
        }}
      >
        <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
          <View style={{ gap: 24, backgroundColor: '#fff' }}>
            <CustomText color="#1F077A" weight={600} size={16}>
              Manage Data
            </CustomText>
            <CustomText weight={500} size={12}>
              This information will be used for personalizing your experience &
              services across Farmerpay platform
            </CustomText>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <CustomText
                letterSpacing={1}
                size={14}
                weight={500}
                color="#797979"
                lineHeight={16}
              >
                Personal Information
              </CustomText>
              <TouchableOpacity
                onPress={() => {
                  setDropActive1(!drop1);
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {drop1 ? <DownArrow /> : <UpArrow />}
                </View>
              </TouchableOpacity>
            </View>
            {drop1 ? (
              <>
                <Item
                  title="Marital Status"
                  subTitle="What is your current marital status?"
                  onPress={() =>
                    navigation.navigate('maritalStatus')
                  }
                  active={activez.maritalStatus}
                  navigation={navigation}
                />
                <Item
                  title="Education "
                  subTitle="What is your highest education?"
                  onPress={() => navigation.navigate('educationStatus')}
                  active={activez.education}
                  navigation={navigation}
                />
                <Item
                  title="Family Members"
                  subTitle="Who do you live with?"
                  onPress={() => {
                    navigation.navigate('familyMembers');
                  }}
                  active={activez.familyMembers}
                  navigation={navigation}
                />
              </>
            ) : null}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <CustomText
                letterSpacing={1}
                size={14}
                weight={500}
                color="#797979"
                lineHeight={16}
              >
                Preferences
              </CustomText>
              <TouchableOpacity
                onPress={() => {
                  setDropActive2(!drop2);
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {drop2 ? <DownArrow /> : <UpArrow />}
                </View>
              </TouchableOpacity>
            </View>
            {drop2 ? (
              <>
                <Item
                  title="Domestic Travel"
                  subTitle="How often do you travel domestically?"
                  onPress={() => {
                    navigation.navigate('domesticTravel');
                  }}
                  active={activez.domesticTravel}
                  navigation={navigation}
                />
                <Item
                  title="International Travel"
                  subTitle="How often do you travel internationally?"
                  onPress={() => {
                    navigation.navigate('internationalTravel');
                  }}
                  active={activez.internationalTravel}
                  navigation={navigation}
                />
                <Item
                  title="Personal Interests"
                  subTitle="Which of the following categories do you have an interest in?"
                  onPress={() => {
                    navigation.navigate('personalInterests');
                  }}
                  active={activez.personalIntrests}
                  navigation={navigation}
                />
              </>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default AdditionalDetailScreen;
