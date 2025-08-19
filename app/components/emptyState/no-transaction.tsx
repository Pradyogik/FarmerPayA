import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import BackArrow from '../assets/images/back-arrow.svg';

const { width } = Dimensions.get('window');

const services = [
  {
    id: '1',
    title: 'Electricity Bill',
    subtitle: 'Transaction',
    icon: require('../../assets/images/empty-state/cash.png'),
  },
  {
    id: '2',
    title: 'Insurance',
    subtitle: 'Transaction',
    icon: require('../../assets/images/empty-state/insurance.png'),
  },
];

export default function NoTransactionScreen() {
  return (
    <View style={styles.container}>
      
      {/* Illustration */}
      <Image
        source={require('../../assets/images/empty-state/no-transaction.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Subtext */}
      <Text style={styles.subtext}>Make Your First Transfer</Text>

      {/* Suggestion Cards */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Image source={item.icon} style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.transferBtn}>
              <Text style={styles.transferText}>Transfer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B320D',
    textAlign: 'center',
    marginBottom: 16,
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  subtext: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 36,
  },
  cardList: {
    paddingBottom: 24,
  },
  card: {
    width: width - 32, // full width minus paddingHorizontal * 2
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  cardIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  transferBtn: {
    backgroundColor: '#97EAD2',
    borderRadius: 42,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transferText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'center',
  },
});

