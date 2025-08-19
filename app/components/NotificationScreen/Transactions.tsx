import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CheckIcon from '../../assets/images/notifications/check-circle.svg';
import BenefitIcon from '../../assets/images/notifications/benefit.svg';
import FailedIcon from '../../assets/images/notifications/failed.svg';
import RupeeIcon from '../../assets/images/notifications/rupee.svg';

const transactions = [
  {
    id: '1',
    icon: CheckIcon,
    
    message: '₹5,000 credited to your account for loan disbursal. View details in your transaction history.',
    time: '11:00 AM',
    dateGroup: 'TODAY',
  },
  {
    id: '2',
    icon: BenefitIcon,
    
    message: 'You received a government scheme benefit of ₹2,500. View in your transaction summary.',
    time: '9:30 AM',
    dateGroup: 'TODAY',
  },
  {
    id: '3',
    icon: FailedIcon,
    
    message: 'Transaction failed due to insufficient balance. Please check your account and try again.',
    time: '6:45 PM',
    dateGroup: 'YESTERDAY',
  },
  {
    id: '4',
    icon: RupeeIcon,
    
    message: 'All recent transactions are now updated. Tap to review your financial activity.',
    time: '5:00 PM',
    dateGroup: 'YESTERDAY',
  },
];


export default function Transactions() {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => {
  const IconComponent = item.icon;

  return (
    <View style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: item.bgColor }]}>
        <IconComponent width={32} height={32} />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{item.message}</Text>
        <View style={styles.timeRow}>
          <Icon name="clock" size={12} color="#888" style={{ marginRight: 4 }} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    </View>
  );
};

  const groupedData = transactions.reduce((acc: any, item) => {
    if (!acc[item.dateGroup]) acc[item.dateGroup] = [];
    acc[item.dateGroup].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(groupedData)}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.sectionHeading}>{item}</Text>
            {groupedData[item].map((entry: any) => (
              <View key={entry.id}>{renderItem({ item: entry })}</View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#54219D',
    paddingBottom: 6,
    marginRight: 20,
  },
  activeTabText: {
    color: '#54219D',
    fontWeight: 'bold',
  },
  inactiveTab: {
    paddingBottom: 6,
    marginRight: 20,
  },
  inactiveTabText: {
    color: '#888',
  },
  sectionHeading: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    marginTop: 16,
  },
  card: {
  flexDirection: 'row',
  backgroundColor: '#F8F8F8',
  borderRadius: 8,
  padding: 12,
  marginBottom: 10,
  alignItems: 'center', // <-- fix: align vertically centered
},

 iconWrapper: {
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

  messageContainer: {
    flex: 1,
  },
  messageText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
});
