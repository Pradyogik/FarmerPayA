import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');
import BackArrow from '../../assets/images/Profile/backArrow.svg';
import InfoIcon from '../../assets/images/Icons/threeDot.svg';
import Frontarrow from '../../assets/images/Icons/frontArrow.svg';
import { SvgProps } from 'react-native-svg';

import Sbi from '../../assets/images/Profile/sbiBigIcon.svg';
import FingerPrintPopUp from '../../components/Profile/fingerPrintPopUp';

interface bankItemProps {
  BankIcon: React.FC<SvgProps>;
  bankName: string;
  accountHolderName: string;
  accountType: string;
}

const BankItem: React.FC<bankItemProps> = ({
  BankIcon,
  bankName,
  accountHolderName,
  accountType,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <BankIcon />
          <View style={{ flexDirection: 'column',gap:12}}>
            <Text
              style={{
                fontFamily: 'Inter-Regular', // Use actual registered font name
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 21,
                letterSpacing: 0,
                color: '#000', // optional but recommended
              }}
            >
              {bankName}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter', // Make sure 'Inter' is loaded & linked
                fontWeight: '400', // 400 is 'normal'
                fontStyle: 'normal', // No 'Regular', use 'normal' or 'italic'
                fontSize: 12, // px in web translates to number in RN
                lineHeight: 18, // in dp
                letterSpacing: 0, // in dp
                color:'#656f77'
                // leadingTrim: NONE — not supported in RN
              }}
            >
            {accountType}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter', // Make sure Inter font is linked/loaded
                fontWeight: '500', // 500 = Medium weight
                fontStyle: 'normal', // RN doesn't have 'Medium' for fontStyle, only 'normal' or 'italic'
                fontSize: 14,
                lineHeight: 21,
                letterSpacing: 0,
                // leading-trim: NONE → not supported, control spacing manually
              }}
            >{accountHolderName} </Text>
          </View>
        </View>
      </View>
      <View style={Styles.line} />
    </View>
  );
};

const SecurityScreen = () => {
  const [active, setActive] = useState(false);
  const [fingerActive, setFingerActive]=useState(false);
  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
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
          <BackArrow />
          <Text style={{ fontSize: 16, color: '#fff' }}>
            Security
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
        <View style={{ paddingVertical: 16, gap: 24, paddingHorizontal: 24 }}>
          <View style={Styles.box}>
            <Text style={[Styles.text]}>Set Device Pin {'(Not Set)'}</Text>
            <View style={Styles.line} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={[Styles.text2]}>
                Please set up device unlock{'\n'} and enable for Farmerpay
              </Text>
              <Frontarrow />
            </View>
          </View>

          <View style={Styles.box}>
            <Text style={[Styles.text]}>Reset Security Pin</Text>
            <View style={Styles.line} />
            <BankItem
              BankIcon={Sbi}
              bankName="State bank Of India"
              accountHolderName='R.Animesh'
              accountType='Savings Account'
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={[Styles.text2]}>
                UPI PIN is not set for{'\n'} this account
              </Text>
              <TouchableOpacity>
                <Text style={[Styles.disabled, { color: '#3D65CA' }]}>
                  Reset Pin{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={Styles.box}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Text style={[Styles.text]}>App Lock:</Text>
                {active ? (
                  <Text style={[Styles.disabled, { color: '#1FC16B' }]}>
                    Enabled
                  </Text>
                ) : (
                  <Text style={Styles.disabled}>Disabled</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {setActive(!active);setFingerActive(!fingerActive)}}
                style={{
                  borderRadius: 48,
                  backgroundColor: active ? '#1FC16B' : '#F2F2F7',
                  width: 80,
                  padding: 4,
                }}
              >
                <View
                  style={{
                    borderRadius: 48,
                    height: 32,
                    width: 32,
                    backgroundColor: '#fff',
                    elevation: 1,
                    alignSelf: active ? 'flex-end' : 'flex-start',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.line} />

            <Text style={[Styles.text2]}>
              App Lock provides an extra layer of security for the FarmerPay app
            </Text>
          </View>
        </View>
      </View>

      <FingerPrintPopUp
      visible={fingerActive}
      onTryAgain={()=>{setFingerActive(!fingerActive)}}/>
    </LinearGradient>
  );
};

export default SecurityScreen;

const Styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: '#DEDEDE',
    width: width - 63,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  box: {
    flexDirection: 'column',
    borderRadius: 32,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  btnText: {
    fontFamily: 'Inter-SemiBold', // if custom font name is defined this way
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12, // 10 * 1.2
    letterSpacing: 0,
    color: '#fff', // always define color explicitly
  },
  text: {
    color: '#656565', // directly use the hex
    fontFamily: 'Inter-SemiBold', // or 'Inter_600SemiBold' for Expo Google Fonts
    fontSize: 14,
    fontWeight: '600', // works for system/variable fonts, else use SemiBold font file
    lineHeight: 21, // numeric value in RN
  },
  text2: {
    color: '#252525', // extracted from var(--grey-900, #252525)
    fontFamily: 'Inter-Medium', // if using .ttf files
    fontSize: 12,
    lineHeight: 18, // numeric in RN, no px
    fontWeight: 'normal', // prevent Android from overriding custom font weight
  },
  disabled: {
    color: '#D00416', // pulled from var(--Colors-Red-200, #D00416)
    fontFamily: 'Inter-Medium', // if using custom .ttf files
    fontSize: 14,
    lineHeight: 21, // numeric, no "px"
    fontWeight: 'normal', // prevent Android overriding custom font
  },
});
