import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FarmerCard from '../../components/Profile/FarmerCard';
import LivelihoodScoreCard from '../../components/Profile/LivelihoodScoreCard';
import BankDetailsCard from '../../components/Profile/BankDetailsCard';
import CheckBalanceCard from '../../components/Profile/checkBalance';
import SettingsCompo from '../../components/Profile/settings';
import AccountCardSlider from '../../components/Profile/addAccountSlider';

const ProfileScreenz = ({ navigation }: any) => {
  return (
    <View style={styles.container}>

      {/* Top Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.helpIcon}>
          <Icon name="help-circle-outline" size={24} color="#250E45" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FarmerCard
          name="ABC Kumar"
          role="Crop Farmer"
          location="Nashik"
          id="FX - 1000256"
          onAddDetails={() => {navigation.navigate('addMissingDetails1')}}
        />

        <LivelihoodScoreCard />

        <BankDetailsCard
          bankName="State Bank of India"
          accountSuffix="1000"
          accountType="Savings Account"
          upiId="animesh@ybl"
          onManage={() => console.log('Manage bank account')}
        />

        <CheckBalanceCard />

        <AccountCardSlider navigation={navigation} />

        <SettingsCompo />

        <Text style={{ fontSize: 30, fontWeight: 600, color: '#D1BDED' }}>
          Built with ❤️ for Indian Agriculture
        </Text>
      </ScrollView>
      {/* Floating Icon */}
      <TouchableOpacity
        onPress={() => {
          console.log('Floating icon pressed');
        }}
        style={styles.floatingButton}
      >
        <Image
          source={require('../../assets/images/mic.png')}
          style={styles.floatingIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    //backgroundColor: '#FFFFFF', // <-- match background
    // optional: subtle border like Figma
    //elevation:2
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  helpIcon: {
    padding: 6,
  },
  scrollContainer: {
    bottom: 20,
    paddingBottom: 100,
    paddingTop: 25,
    flexDirection: 'column',
    gap: 20,
    backgroundColor: '#FFFFFF', // <-- ensure scroll area is also white
  },
  floatingButton: {
    position: 'absolute',
    width: 71,
    height: 71,
    borderRadius: 35.5,
    backgroundColor: '#6929C4', // or use a gradient if needed
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 60, // Replace `top: 779` with bottom for responsive layout
    right: 20, // Replace `left: 356` with right for alignment on all screens
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  floatingIcon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
});

export default ProfileScreenz;
