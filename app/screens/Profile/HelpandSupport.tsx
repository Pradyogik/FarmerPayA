import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// SVG Icons
import AddQuery from '../../assets/images/Profile/Add.svg';
import AccountKYC from '../../assets/images/Profile/accountkyc.svg';
import UPI from '../../assets/images/Profile/upi.svg';
import MoneyTransfer from '../../assets/images/Profile/moneytransfer.svg';
import RechargeBills from '../../assets/images/Profile/rechargebills.svg';
import TrackBank from '../../assets/images/Profile/trackbank.svg';
import Insurance from '../../assets/images/Profile/insurance.svg';
import BBPS from '../../assets/images/Profile/bbp.svg';
import Merchant from '../../assets/images/Profile/merchant.svg';
import Fastag from '../../assets/images/Profile/fastag.svg';
import CreditCard from '../../assets/images/Profile/creditcard.svg';
import LoanEMI from '../../assets/images/Profile/loanemi.svg';
import BackArrow from '../../assets/images/back-arrow.svg';
import SearchMic from '../../assets/images/Profile/searchmic.svg';

const { height, width } = Dimensions.get('window');
const gridPadding = 16;
const spacing = 12;
const columns = 4;
const tileWidth = (width - 2 * gridPadding - spacing * (columns - 1)) / columns;

const categories = [
  { label: 'Add New Query', Icon: AddQuery },
  { label: 'My Account & KYC', Icon: AccountKYC },
  { label: 'UPI', Icon: UPI },
  { label: 'Money Transfer', Icon: MoneyTransfer },
  { label: 'Recharge & Bills', Icon: RechargeBills },
  { label: 'Track Bank Account', Icon: TrackBank },
  { label: 'Insurance', Icon: Insurance },
  { label: 'BBPS', Icon: BBPS },
  { label: 'Merchant Payments', Icon: Merchant },
  { label: 'Fastag', Icon: Fastag },
  { label: 'Credit Cards', Icon: CreditCard },
  { label: 'Loan EMI', Icon: LoanEMI },
];

const HelpAndSupport = ({navigation}:any) => {


  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 ,paddingTop:StatusBar.currentHeight||40}}
    >
      {/* Gradient Header */}
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
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow color="#fff" width={28} height={28} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: '#fff' }}>Help and Support</Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Curved White Content */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Select a Category</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <SearchMic width={20} height={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search category"
              placeholderTextColor="#999"
            />
          </View>

          {/* Grid Layout */}
          <View style={styles.gridContainer}>
            {Array.from({ length: Math.ceil(categories.length / 4) }, (_, rowIndex) => {
              const rowItems = categories.slice(rowIndex * 4, rowIndex * 4 + 4);
              return (
                <View key={rowIndex} style={styles.gridRow}>
                  {rowItems.map((item, index) => {
                    const SvgIcon = item.Icon;
                    const isAddQuery = item.label === 'Add New Query';
                    const isLastItem = index === rowItems.length - 1;
                    return (
                      <View
                        key={index}
                        style={[
                          styles.gridItemWrapper,
                          !isLastItem && { marginRight: spacing },
                        ]}
                      >
                        <TouchableOpacity
                          style={[
                            styles.iconBox,
                            isAddQuery && styles.greyTile,
                          ]}
                          onPress={() => {
                            if (isAddQuery) {
                              navigation.navigate('addNewQuery');
                            } else {
                              navigation.navigate('FAQ', { category: item.label });
                            }
                          }}
                        >
                          <SvgIcon width={32} height={32} />
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.tileLabel,
                            isAddQuery && { color: '#000' },
                          ]}
                        >
                          {item.label}
                        </Text>
                      </View>
                    );
                  })}
                  {rowIndex < Math.ceil(categories.length / 4) - 1 && (
                    <View style={styles.gridDivider} />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    color: '#656565',
    marginBottom: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  gridContainer: {
    paddingHorizontal: gridPadding,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  gridItemWrapper: {
    width: tileWidth,
    alignItems: 'center',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D1BDED',
    backgroundColor: '#F0EAF9',
  },
  greyTile: {
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  gridDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 12,
    marginBottom: 4,
    width: '100%',
  },
  tileLabel: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#4506A0',
  },
});
