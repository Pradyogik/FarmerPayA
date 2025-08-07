import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Clipboard, Image } from 'react-native';
import CopyIcon from '../../assets/images/Profile/copy.svg';
import SBIIcon from '../../assets/images/Profile/sbi.png';
import {useNavigation} from '@react-navigation/native';

interface BankDetailsCardProps {
  bankName: string;
  accountSuffix: string;
  accountType: string;
  upiId: string;
  onManage: () => void;
}

const BankDetailsCard: React.FC<BankDetailsCardProps> = ({
  bankName,
  accountSuffix,
  accountType,
  upiId,
  onManage,
}) => {
  const copyUPI = () => {
    Clipboard.setString(upiId);
    Alert.alert('Copied', 'UPI ID copied to clipboard');
  };
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Receiving Money In</Text>
      </View>

      <View style={styles.bankRow}>
        <View style={styles.bankIconCircle}>
          <Image source={SBIIcon} style={styles.bankIcon} resizeMode="contain" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bankName}>{`${bankName} - ${accountSuffix}`}</Text>
          <Text style={styles.accountType}>{accountType}</Text>
        </View>
        <TouchableOpacity style={styles.manageBtn} onPress={()=> navigation.navigate('PaymentsSettings')}>
          <Text style={styles.manageText}>Manage</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.upiRow}>
        <Text style={styles.upiLabel}>My UPI ID:</Text>
        <Text style={styles.upiId}>{upiId}</Text>
        <TouchableOpacity onPress={copyUPI}>
          <CopyIcon width={16} height={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
  borderRadius: 12,
  backgroundColor: '#F8F8F8',     // light grey for card (not screen)
  borderWidth: 1,
  borderColor: '#C0C0C0',
  padding: 12,
  shadowColor: 'transparent',     // remove shadow if unwanted
  elevation: 0,                   // no Android elevation
  //marginVertical: 10,
  //marginHorizontal: 20,
},
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bankIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankIcon: {
    width: 36,
    height: 36,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  accountType: {
    fontSize: 12,
    color: '#777',
  },
  manageBtn: {
  width: 75,
  height: 40,
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#54219D',
  backgroundColor: '#F8F8F8',
  alignItems: 'center',         // centers horizontally
  justifyContent: 'center',     // centers vertically 
},

  manageText: {
  color: '#54219D',
  fontSize: 12,
  fontWeight: '600',
  textAlign: 'center',
},

  upiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  upiLabel: {
    fontSize: 13,
    color: '#6E6E6E',
  },
  upiId: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
  },
});

export default BankDetailsCard;