import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../assets/images/back-arrow.svg';
import UpiID from '../../components/Profile/UPISettings/UPI-ID';
import UpiNumber from '../../components/Profile/UPISettings/UPI-Number';

const { height, width } = Dimensions.get('window');
const gridPadding = 16;
const spacing = 12;
const columns = 4;
const tileWidth = (width - 2 * gridPadding - spacing * (columns - 1)) / columns;

const UPISettings = ({navigation}:any) => {
  const [activeTab, setActiveTab] = useState<'upiID' | 'upiNumber'>('upiID');

  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 ,paddingTop:StatusBar.currentHeight||40}}
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
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
          <Text style={{ fontSize: 16, color: '#fff' }}>UPI Settings</Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Curved White Content */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Tabs */}
                <View style={styles.tabs}>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 'upiID' && styles.activeTab]}
                    onPress={() => setActiveTab('upiID')}
                  >
                    <Text style={[styles.tabText, activeTab === 'upiID' && styles.activeText]}>UPI ID</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 'upiNumber' && styles.activeTab]}
                    onPress={() => setActiveTab('upiNumber')}
                  >
                    <Text style={[styles.tabText, activeTab === 'upiNumber' && styles.activeText]}>UPI Number</Text>
                  </TouchableOpacity>
                </View>
          
                {/* Content */}
                {activeTab === 'upiID' ? <UpiID /> : <UpiNumber/>}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default UPISettings;

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
