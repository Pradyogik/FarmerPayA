import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AdSlider from './AdSlider/AdCardSlider';
import textStyles from '../utils/constants/textStyles';
import QrIcon from '../assets/images/HomeScreen/FarmerPayUPI/qr.svg';
import RechargeIcon from '../assets/images/HomeScreen/FarmerPayUPI/recharge.svg';
import ElectricityIcon from '../assets/images/HomeScreen/FarmerPayUPI/electricity.svg';
import UpiIcon from '../assets/images/HomeScreen/FarmerPayUPI/upi.svg';

const { width } = Dimensions.get('window');

const UPI_OPTIONS = [
  { label: 'My QR', icon: QrIcon },
  { label: 'UPI Lite', icon: UpiIcon },
  { label: 'Recharge', icon: RechargeIcon },
  { label: 'Electricity', icon: ElectricityIcon },
];

const FarmerPayUPI = () => {
  return (
    <View style={styles.container}>
      <Text style={[textStyles.title, {paddingLeft:16}]}>FarmerPay UPI</Text>

      <View style={styles.optionsRow}>
        {UPI_OPTIONS.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => {}}>
            <View style={styles.optionBox}>
              <item.icon />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
    </View>
    
  );
};

export default FarmerPayUPI;

const GAP = 6;
const BOX_COUNT = 4;
const BOX_SIZE = (width - 32 - GAP * (BOX_COUNT - 1)) / BOX_COUNT; 
// 32 → paddingHorizontal (16 left + 16 right)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 24,
    flex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:16,
    gap: GAP,
  },
  optionBox: {
    width: BOX_SIZE,
    height: BOX_SIZE, // square
    backgroundColor: '#4506A00D',
    borderColor: '#D1BDED',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20, // 100% of font size
    letterSpacing: -0.64, // -4% of 16px
    textAlign: 'center',
    color: '#4506A0',
    marginTop: 6,
  },
});
