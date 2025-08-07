import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');
import BackArrow from '../../assets/images/Profile/backArrow.svg';
import InfoIcon from '../../assets/images/Profile/infoIcon.svg';
import MicIcon from '../../assets/images/Profile/mic-star-Icon.svg';
import SbiIcon from '../../assets/images/Profile/SbiIcon.svg';
import IciciIcon from '../../assets/images/Profile/icici-bank-apps-square.svg';
import PnbIcon from '../../assets/images/Profile/punjab-national-bank-square.svg';
import HdfcIcon from '../../assets/images/Profile/HDFC.svg';
import KotakIcon from '../../assets/images/Profile/Kotak.svg';
import AxisIcon from '../../assets/images/Profile/axis-bank-apps-square.svg';
import AllahabadIcon from '../../assets/images/Profile/Allahabad.svg';
import IndianOverSeasIcon from '../../assets/images/Profile/IndianOverseas.svg';
import CanaraIcon from '../../assets/images/Profile/Canara.svg';
import BOBIcon from '../../assets/images/Profile/BOB.svg';
import { SvgProps } from 'react-native-svg';
import ShimmerLoader from '../../components/Profile/shimmerLoader';

interface BankCardProps {
  BankIcon: React.FC<SvgProps>;
  bankName: string;
  onPress?: () => void;
}
const BankCard: React.FC<BankCardProps> = ({ BankIcon, bankName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: '#F8F8F8',
          borderColor: '#E4E4E4',
          borderWidth: 1,
          width: (width - 56) / 2,
          height: (width - 96) / 2,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          gap: 24,
        }}
      >
        <BankIcon />
        <Text style={{ fontSize: 12, textAlign: 'center', color: '#0000000' }}>
          {bankName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const FindingYourBank = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        flexDirection: 'column',
        height: height * 0.3,
        width: width,
        padding: 16,
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
      }}
    >
      <View style={{ gap: 16 }}>
        <View
          style={{
            backgroundColor: '#DEDEDE',
            height: 8,
            borderRadius: 16,
            width: 60,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            height: 1,
            backgroundColor: '#DEDEDE',
            alignSelf: 'center',
            width: width - 32,
          }}
        />
      </View>
      <View style={{ gap: 16, marginTop: 16 }}>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold', // Make sure this matches your font file name
            fontWeight: '600', // Optional if font file already includes weight
            fontSize: 16,
            lineHeight: 24, // 1.2x the fontSize is a good rule of thumb
            //letterSpacing: 0, // Slightly tight spacing (adjust as needed)
            color: '#3F1976', // Set a color explicitly
          }}
        >
          Finding your bank account(s) linked with Punjab National Bank
        </Text>

        <Text
          style={{
            fontFamily: 'Inter-Medium', // Match the font file name exactly
            fontWeight: '500', // Optional if the font file is already weighted
            fontSize: 12,
            lineHeight: 20, // Usually 1.2x fontSize is solid (16 * 1.25)
            letterSpacing: 0, // Negative letter spacing (adjust as needed)
            color: '#000', // Always specify color to avoid surprises
          }}
        >
          Please do not press back or close the app
        </Text>
        <ShimmerLoader borderRadius={12} />
      </View>
    </View>
  );
};
const selectYourBankScreen = ({ navigation }: any) => {
  const [findBank, setFindBank] = useState(false);
  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      //header
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
          <Text style={{ fontSize: 14, color: '#fff' }}>
            Select your Bank Account
          </Text>
        </View>
        <InfoIcon />
      </View>
      <View
        style={{
          flex: 1,
          borderTopStartRadius: 32,
          borderTopEndRadius: 32,
          backgroundColor: '#fff',
        }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingTop: 24,
            gap: 16,
            paddingLeft: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              backgroundColor: '#F2F2F2',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: '#A2A2A2',
              marginHorizontal: 8,
            }}
          >
            <MicIcon />
            <Text style={{ fontSize: 12, color: '#A2A2A2' }}>
              Search or Say Your Bank Name
            </Text>
          </View>
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: 600, color: '#1F077A' }}>
              Popular Banks
            </Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ flexDirection: 'column', gap: '16' }}>
                <BankCard
                  onPress={() => {
                    setFindBank(!findBank);
                  }}
                  BankIcon={SbiIcon}
                  bankName={'State Bank of India'}
                />
                <BankCard
                  onPress={() => {
                    setFindBank(!findBank);
                  }}
                  BankIcon={PnbIcon}
                  bankName={'PNB Bank'}
                />
                <BankCard
                  onPress={() => {
                    setFindBank(!findBank);
                  }}
                  BankIcon={KotakIcon}
                  bankName={'Kotak Mahindra bank'}
                />
              </View>
              <View style={{ flexDirection: 'column', gap: '16' }}>
                <BankCard
                  onPress={() => {
                    setFindBank(!findBank);
                  }}
                  BankIcon={IciciIcon}
                  bankName={'ICICI Bank'}
                />
                <BankCard
                  onPress={() => {
                    setFindBank(!findBank);
                  }}
                  BankIcon={AxisIcon}
                  bankName={'Axis Bank'}
                />
                <BankCard
                  onPress={() => {
                    setFindBank(!findBank);
                  }}
                  BankIcon={HdfcIcon}
                  bankName={'HDFC Bank'}
                />
              </View>
            </View>
            <View
              style={{
                height: 1,
                width: width - 40,
                marginTop: 16,
                marginBottom: 16,
                backgroundColor: '#DEDEDE',
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 16,
                color: '#1F077A',
              }}
            >
              All Banks
            </Text>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <AllahabadIcon />
                <Text style={{ fontSize: 12 }}>Allahabad Bank</Text>
              </View>
              <View
                style={{
                  height: 1,
                  width: width - 40,
                  marginTop: 16,
                  marginBottom: 16,
                  backgroundColor: '#DEDEDE',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <IndianOverSeasIcon />
                <Text style={{ fontSize: 12 }}>Indian Overseas Bank</Text>
              </View>
              <View
                style={{
                  height: 1,
                  width: width - 40,
                  marginTop: 16,
                  marginBottom: 16,
                  backgroundColor: '#DEDEDE',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <CanaraIcon />
                <Text style={{ fontSize: 12 }}>Canara Bank</Text>
              </View>
              <View
                style={{
                  height: 1,
                  width: width - 40,
                  marginTop: 16,
                  marginBottom: 16,
                  backgroundColor: '#DEDEDE',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <BOBIcon />
                <Text style={{ fontSize: 12 }}>Bank Of Baroda</Text>
              </View>
              <View
                style={{
                  height: 1,
                  width: width - 40,
                  marginTop: 16,
                  marginBottom: 16,
                  backgroundColor: '#DEDEDE',
                }}
              />
            </View>
          </View>
        </ScrollView>
        {findBank && <FindingYourBank />}
      </View>
    </LinearGradient>
  );
};

export default selectYourBankScreen;

//default screen

// import React from "react";
// import { Dimensions, Text, View } from "react-native";
// import LinearGradient from "react-native-linear-gradient";

// const {height, width} = Dimensions.get('window');
// import BackArrow from "../../assets/images/Profile/backArrow.svg";
// import InfoIcon from "../../assets/images/Profile/infoIcon.svg";
// const selectYourBankScreen = () => {
//     return (

//     <LinearGradient
//       colors={['#4506A0', '#6929C4']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={{flex:1 ,  }}
//     >
//     <View style={{flexDirection:'row', justifyContent:'space-between' ,padding:16, alignItems:'center', elevation:4 , shadowColor:'#fff', height:height*0.08}}> <View style={{flexDirection:'row',gap:12}}><BackArrow/><Text style={{fontSize:16,color:'#fff'}}>Select your Bank Account</Text></View><InfoIcon/></View>
//     <View style={{flex:1,borderTopStartRadius:32,borderTopEndRadius:32, backgroundColor:'#fff'} }>

//     </View>

//     </LinearGradient>

//     );
// }

// export default selectYourBankScreen;
