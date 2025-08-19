import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');
import BackArrow from '../../assets/images/Profile/backArrow.svg';
import ThreeDotIcon from '../../assets/images/Icons/threeDot.svg';
import CopyIcon from '../../assets/images/Icons/copyIcon.svg';
import InfoIcon from '../../assets/images/Icons/infoIcon.svg';
import Sbi from '../../assets/images/Profile/sbiBigIcon.svg';
import Pnb from '../../assets/images/Profile/punjab-national-bank-square.svg';
import PlusIcon from '../../assets/images/Icons/plusIcon.svg';
import { SvgProps } from 'react-native-svg';
interface bankItemProps {
  BankIcon: React.FC<SvgProps>;
  bankName: string;
  accountNumber: string;
  isPrimary: boolean;
}

interface cardItemProps {
  CardIcon: React.FC<SvgProps>;
  cardHolderName: string;
  cardNumber: string;
  isPrimary: boolean;
}
const BankItem: React.FC<bankItemProps> = ({
  BankIcon,
  bankName,
  accountNumber,
  isPrimary,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          paddingLeft:8,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <BankIcon />
          <View style={{ flexDirection: 'column', gap: 16 }}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold', // or whatever your font file is named
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 21,
                letterSpacing: 0,
                color: '#000', // always define default color
              }}
            >
              xxxx {accountNumber}
            </Text>
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
          </View>
        </View>
        {isPrimary && (
          <View
            style={{
              borderRadius: 48,
              backgroundColor: '#6929C4',
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}
          >
            <Text style={styles.btnText}>Primary</Text>
          </View>
        )}
      </View>
      <View style={styles.line} />
    </View>
  );
};

const CardItem: React.FC<cardItemProps> = ({
  CardIcon,
  cardHolderName,
  cardNumber,
  isPrimary,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          paddingLeft:8,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <CardIcon />
          <View style={{ flexDirection: 'column', gap: 6 }}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold', // or whatever your font file is named
                fontSize: 14,
                fontWeight: '600',
                letterSpacing: 0,
                textAlign: 'center',
                alignItems: 'center',
                color: '#000', // always define default color
              }}
            >
              <Text style={{ fontSize: 32, textAlignVertical: 'center' }}>
                ..........
              </Text>{' '}
              {cardNumber}
            </Text>
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
              {cardHolderName}
            </Text>
          </View>
        </View>
        {isPrimary && (
          <View
            style={{
              borderRadius: 48,
              backgroundColor: '#6929C4',
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}
          >
            <Text style={styles.btnText}>Primary</Text>
          </View>
        )}
      </View>
      <View style={styles.line} />
    </View>
  );
};
const paymentSettings2 = () => {
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
          <Text style={{ fontSize: 16, color: '#fff' }}>Payment Settings</Text>
        </View>
        <ThreeDotIcon />
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
            paddingTop: 24,
            gap: 16,
            paddingHorizontal: 16,
            paddingBottom: 24,
          }}
        >
          <View style={styles.box}>
            <LinearGradient
              colors={['#DEDEDE', '#EFEFEF14']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBox}
            >
              <Text style={styles.text1}>
                UPI ID:{'  '}
                <Text style={{ fontSize: 13, fontWeight: '400' }}>
                  animesh@ybl{' '}
                </Text>
              </Text>
              <CopyIcon />
            </LinearGradient>
            <View style={styles.line} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <LinearGradient
                colors={['#DEDEDE', '#EFEFEF14']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBox}
              >
                <InfoIcon />
                <Text style={styles.text1}>
                  UPI Lite:{' '}
                  <Text style={{ fontWeight: '400' }}>9578641230</Text>
                </Text>
              </LinearGradient>
              <Text
                style={[styles.text1, { color: '#326CF9', marginRight: 8 }]}
              >
                {' '}
                Activate
              </Text>
            </View>
            <View style={styles.line} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <LinearGradient
                colors={['#DEDEDE', '#EFEFEF14']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBox}
              >
                <InfoIcon />{' '}
                <Text style={styles.text1}>
                  UPI Lite:{' '}
                  <Text style={{ fontWeight: '400' }}>9578641230</Text>
                </Text>
              </LinearGradient>{' '}
              <Text
                style={[styles.text1, { color: '#326CF9', marginRight: 8 }]}
              >
                {' '}
                Activate
              </Text>
            </View>
            <View style={styles.line} />
          </View>

          <View style={styles.box}>
            <LinearGradient
              colors={['#DEDEDE', '#EFEFEF14']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBox}
            >
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold', // Make sure this matches the actual font file name in your project
                  fontWeight: '600',
                  fontSize: 14,
                  lineHeight: 14, // 100% of font size
                  letterSpacing: 0,
                  color: '#656565', // Add default text color if not set
                }}
              >
                Bank Accounts
              </Text>
            </LinearGradient>
            <View style={styles.line} />
            <BankItem
              BankIcon={Sbi}
              bankName="State bank Of India"
              accountNumber="1050"
              isPrimary={true}
            />

            <BankItem
              BankIcon={Pnb}
              bankName="Punjab National Bank"
              accountNumber="1050 - 110"
              isPrimary={false}
            />
          </View>

          <View style={styles.box}>
            <LinearGradient
              colors={['#DEDEDE', '#EFEFEF14']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBox}
            >
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold', // Make sure this matches the actual font file name in your project
                  fontWeight: '600',
                  fontSize: 14,
                  lineHeight: 14, // 100% of font size
                  letterSpacing: 0,
                  color: '#656565', // Add default text color if not set
                }}
              >
                Add Cards
              </Text>
            </LinearGradient>
            <View style={styles.line} />

            <CardItem
              CardIcon={Sbi}
              cardHolderName="R.Animesh"
              cardNumber="7728"
              isPrimary={true}
            />

            <TouchableOpacity style={{ flexDirection: 'row', gap: 16,padding:16 }}>
              <PlusIcon />
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold', // 👈 Match your actual font file name
                  fontSize: 14,
                  fontWeight: '600',
                  lineHeight: 21,
                  letterSpacing: 0,
                  color: '#000', // optional default
                }}
              >
                Add card
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default paymentSettings2;
const styles = StyleSheet.create({
  text1: {
    fontFamily: 'Inter-Medium', // Depends on font file name
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14, // 100% of 14px
    letterSpacing: 0,
  },
  gradientBox: {
    flexDirection: 'row',
    gap: 6,
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: 4,
    paddingHorizontal: 4,
    paddingRight: 16,
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#DEDEDE',
    width: width - 55,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  box: {
    flexDirection: 'column',
    borderRadius: 32,
    elevation: 4,
    paddingVertical: 16,
    paddingHorizontal: 8,
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
});
