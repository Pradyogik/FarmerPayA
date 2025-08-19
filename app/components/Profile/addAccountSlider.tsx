import React from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SbiIcon from '../../assets/images/Profile/SbiIcon.svg';
import { SvgProps } from 'react-native-svg';
import PlusIcon from '../../assets/images/Profile/PlusIcon.svg';
const { width, height } = Dimensions.get('window');

interface AccountCardProps {
  BankIcon: React.FC<SvgProps>;
  accountStatus: string;
  bankName: string;
  accountSuffix: string;
  onManage?: () => void;
  bgColor: string;
  type: string;
}
const accountList = [
  {
    BankIcon: SbiIcon,
    accountStatus: 'Primary',
    bankName: 'State Bank of India',
    accountSuffix: '1000',
    onManage: () => console.log('Manage bank account'),
    bgColor: '#6929C4',
    type: 'card',
  },
  {
    type: 'add',
  },
  // Add more accounts as needed
];
const AccountCard: React.FC<AccountCardProps> = ({
  BankIcon,
  accountStatus,
  bankName,
  accountSuffix,
  onManage,
  bgColor,
}) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        width: width * 0.6,
        borderRadius: 32,
        padding: 16,
        gap: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <BankIcon />
        <TouchableOpacity
          style={{
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: '#fff',
          }}
        >
          <Text style={{ fontSize: 12 }}>{accountStatus}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
          {bankName}
        </Text>
        <Text style={{ color: '#fff', fontSize: 14 }}>
          xxxx {accountSuffix}
        </Text>
      </View>
      <TouchableOpacity onPress={onManage}>
        <Text style={{ color: '#fff', fontSize: 14, justifyContent: 'center' }}>
          Check Balance <Text style={{ fontWeight: 600 }}>{'>'}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const AddAccountCard = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectYourBank');
      }}
      style={{
        width: width * 0.6,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#C0C0C0',
        borderRadius: 32,
        padding: 16,
        paddingTop: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#fff', // optional light bg to differentiate
      }}
    >
      <PlusIcon /> 
      <View
        style={{
          backgroundColor: '#E4E4E4',
          borderRadius: 48,
          paddingHorizontal: 24,
          paddingVertical: 12,
        }}
      >
        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>
          Add New Account
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const AccountCardSlider = ({ navigation }: any) => {
  return (
    <View style={{ flexDirection: 'column', gap: 16, paddingHorizontal: 0 }}>
      <View style={{paddingHorizontal:16}}>
      <Text
        style={{
          fontFamily: 'Inter-SemiBold', // or 'Inter_600SemiBold' if using Expo Google Fonts
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0, // in RN, value is in px, not %
          color: '#000', // add explicitly
        }}
      >
        UPI/Bank Accounts
      </Text>
      <View
        style={{ height: 2, width: width * 0.8, backgroundColor: '#DEDEDE' }}
      /></View>
      <FlatList
        data={accountList}
        contentContainerStyle={{paddingHorizontal:16}}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        renderItem={({ item }) => {
          if (item.type === 'add') {
            return <AddAccountCard navigation={navigation} />;
          }
          return (
            <AccountCard
              BankIcon={item.BankIcon ? item.BankIcon : SbiIcon}
              accountStatus={
                item.accountStatus ? item.accountStatus : 'Primary'
              }
              bankName={item.bankName ? item.bankName : 'Bank Name'}
              accountSuffix={item.accountSuffix ? item.accountSuffix : '0000'}
              onManage={item.onManage}
              bgColor={item.bgColor ? item.bgColor : '#6929C4'}
            />
          );
        }}
      />
      {/* <AccountCard
            BankIcon={SbiIcon}
            accountStatus="Primary"
            bankName="State Bank of India"
            accountSuffix="1000"
            onManage={() => console.log('Manage bank account')}
            bgColor="#6929C4"
        /> */}
    </View>
  );
};

export default AccountCardSlider;
