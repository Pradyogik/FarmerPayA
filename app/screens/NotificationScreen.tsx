import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BackArrow from '../assets/images/back-arrow.svg';
import Updates from '../components/NotificationScreen/Updates';
import Transactions from '../components/NotificationScreen/Transactions';

export default function NotificationScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'updates' | 'transactions'>('updates');

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <BackArrow width={30} height={30}color="#54219D"  />
      </TouchableOpacity>
      <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'updates' && styles.activeTab]}
          onPress={() => setActiveTab('updates')}
        >
          <Text style={[styles.tabText, activeTab === 'updates' && styles.activeText]}>Updates</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'transactions' && styles.activeTab]}
          onPress={() => setActiveTab('transactions')}
        >
          <Text style={[styles.tabText, activeTab === 'transactions' && styles.activeText]}>Transactions</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'updates' ? <Updates /> : <Transactions />}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12, // if gap isn't supported in your RN version, use marginLeft in Text
  marginBottom: 24,
  marginTop: 4,
},

headerText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#3F1976',
  // fallback spacing if gap doesn’t work
  marginLeft: 12,
},

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 24,
},

backButton: {
  marginRight: 12,
  padding: 4,
},

header: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#3F1976',
},

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F3EFFF',
    borderRadius: 15,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    color: '#999999',
  },
  activeText: {
    color: '#54219D',
    fontWeight: 'bold',
  },
});
