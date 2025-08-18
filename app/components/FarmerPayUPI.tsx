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
      <Text style={textStyles.title}>FarmerPay UPI</Text>

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
      <AdSlider />
    </View>
  );
};

export default FarmerPayUPI;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 24,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#1F077A',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionBox: {
    backgroundColor: '#4506A00D',
    borderColor: '#4506A026',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
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

  banner: {
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  bannerLeft: {
    flex: 1,
    paddingRight: 12,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#ddd',
    fontSize: 13,
  },
  bannerImage: {
    width: 70,
    height: 70,
  },
});
