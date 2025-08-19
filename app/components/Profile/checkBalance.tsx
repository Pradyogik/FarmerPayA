import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MobileImage from '../../assets/images/Profile/mobileImage.svg';
import BankIcon from '../../assets/images/Profile/BankIcon .svg';
const { height, width } = Dimensions.get('window');
const CheckBalanceCard: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: '#F0EAF9',
        flexDirection: 'column',
        padding: 16,
        borderRadius: 16,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <BankIcon />
        <Text>Check Account Balances</Text>
      </View>
      <View
        style={{ height: 2, width: width * 0.8, backgroundColor: '#DEDEDE' }}
      />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flexDirection: 'column', gap: 16, width: '65%' }}>
          <Text style={{ fontSize: 18, lineHeight: 24, color: '#3D65CA' }}>
            All Accounts ,One {'\n'}Glance
          </Text>
          <View
            style={{
              backgroundColor: '#97EAD2',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 48,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 14 }}>Link Account Now</Text>
          </View>
        </View>
        <MobileImage />
      </View>
    </View>
  );
};

export default CheckBalanceCard;
