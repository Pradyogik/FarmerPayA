import React, { useState , useRef }  from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch ,
  StatusBar,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../assets/images/back-arrow.svg';
import SearchMic from '../../assets/images/Profile/searchmic.svg';
import Volume from '../../assets/images/Profile/volume.svg';
import Logout from '../../assets/images/Profile/logout.svg';
import colors from '../../assets/colors.tsx';

//import { Image } from 'react-native-svg';
const { height, width } = Dimensions.get('window');
const gridPadding = 16;
const spacing = 12;
const columns = 4;
const tileWidth = (width - 2 * gridPadding - spacing * (columns - 1)) / columns;

const YourAccount = () => {
  const navigation = useNavigation();

  const [settings, setSettings] = useState({
    transaction: true,
    governmentSchemes: true,
    billReminder: true,
    financialSuggestions: true,
    refund: true,
    agentUpdates: true,
  });
  const [credit, setCredit] = useState({});


  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

   const toggleSwitch2 = (key: keyof typeof credit) => {
    setCredit(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1,paddingTop: StatusBar.currentHeight || 40, }}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Left side */}
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow color="#fff" width={28} height={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Account</Text>
        </View>

        {/* Right side */}
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Volume width={24} height={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="dots-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Edit Profile */}
          <View style={styles.card}>
            <Text style={styles.title}>Edit Profile</Text>
            <View style={styles.divider} />
            <View style={styles.textWrapper}>
              <Text style ={[styles.body, { flex: 1, marginRight: 0 }]}>
                Change Your Name, Photo, Mobile Number, Role (Farmer/Agent)
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Image
                  source={require('../../assets/images/Profile/nextArrow.png')}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.card}>
            <View style = {styles.titleWrapper}>
              <Text style={styles.title}>Notifications</Text>
              <Text style={styles.subtitle}>Select which types of alerts to receive</Text>
            </View>
             <View style={styles.divider} />
             {[
                { label: 'Transaction', key: 'transaction' },
                { label: 'Government Schemes', key: 'governmentSchemes' },
                { label: 'Bill Payment Reminder', key: 'billReminder' },
                { label: 'Get Financial Product Suggestions', key: 'financialSuggestions' },
                { label: 'Refund', key: 'refund' },
                { label: 'Agent Updates', key: 'agentUpdates' },
              ].map((item, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <CustomToggle
                    value={settings[item.key as keyof typeof settings]}
                    onToggle={() => toggleSwitch(item.key as keyof typeof settings)}
                  />
                </View>
              ))}
          </View>

          {/* Credit Information */} 
          <View style={styles.card}>
            <View style = {styles.titleWrapper}>
              <Text style={styles.title}>Credit Information</Text>
              <Text style={styles.subtitle}>Allow Farmerpay Lending Services as your authorized representative to fetch and provide you access to your credit information from</Text>
            </View>
             <View style={styles.divider} />
             {[
                { label: 'Check Credit Score', key: 'transaction' },
              ].map((item, index) => (
                <View key={index} style={styles.row}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <TouchableOpacity onPress={() => console.log('Enabled clicked')}>
                    <Text style={styles.enabledText}>Enabled</Text>
                  </TouchableOpacity>
                  </View>
                  <CustomToggle
                    value={credit[item.key as keyof typeof credit]}
                    onToggle={() => toggleSwitch2(item.key as keyof typeof credit)}
                  />
                </View>
              ))}
          </View>

          {/* App Preferences */} 
          <View style={styles.card}>
            <View style = {styles.titleWrapper}>
              <Text style={styles.title}>App Preferences</Text>
              <Text style={styles.subtitle}>Choose your app settings</Text>
            </View>
             <View style={styles.divider} />
             {[
              { label: 'Voice Guidance', key: 'transaction' },
                ].map((item, index) => (
                  <View key={index} style={styles.row}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.rowLabel}>{item.label}</Text>
                      <TouchableOpacity onPress={() => console.log('Enabled clicked')}>
                        <Text style={styles.enabledText}>Enabled</Text>
                      </TouchableOpacity>
                    </View>
                    <CustomToggle
                      value={credit[item.key as keyof typeof credit]}
                      onToggle={() => toggleSwitch2(item.key as keyof typeof credit)}
                    />
                  </View>
                ))}

              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Log Out</Text>
                <View style={styles.circle} >
                  <Logout width={24} height = {24} color="#000" />
                </View>
              </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const CustomToggle = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const trackColorOn = '#34C759'; // iOS style green
  const trackColorOff = '#E5E5EA';

  const trackBackground = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [trackColorOff, trackColorOn],
  });

  const thumbPosition = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // adjust for thumb size
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onToggle}>
      <Animated.View
        style={{
          width: 44,
          height: 24,
          borderRadius: 15,
          backgroundColor: trackBackground,
          justifyContent: 'center',
          paddingHorizontal: 2,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: 13,
            backgroundColor: '#fff',
            top: 2,
            left: thumbPosition,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 2,
            shadowOffset: { width: 0, height: 1 },
            elevation: 2, // Android shadow
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    height: height * 0.08,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 16,
    color: '#fff',
  },
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
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  titleWrapper: {
    gap : 12,
    marginBottom:12,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.neutral[700],
    lineHeight:21,
    //marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  subtitle:{
    fontFamily:'Inter-Light',
    fontSize:12,
    fontWeight:'400',
    lineHeight:18,
    color : colors.neutral[800],
    
  },
  body:{
    fontFamily:'Inter-Medium',
    fontSize:14,
    fontWeight:'500',
    lineHeight:21,
    color : colors.neutral[800],
    paddingRight:0,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 12,
    marginBottom:10,
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
  row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12, // more breathing room
},
  rowLabel: {
    fontSize: 12,
    color: colors.neutral[700],
    fontFamily:'Inter-Medium',
    fontWeight: '500',
    lineHeight:12,
    paddingBottom:6,
  },
  circle: {
  width: 48,
  height: 48,
  borderRadius: 24,
  borderWidth:1,
  borderColor: colors.neutral[300],
  backgroundColor: colors.neutral[100], // change to desired color
  justifyContent: 'center',
  alignItems: 'center',
},
enabledText: {
  color: colors.green[200], // bright green
  marginLeft: 8,
  fontWeight: '600',
  fontSize: 14,
},
arrowIcon: {
  width: 24,
  height: 24,
  marginLeft: 0, // small gap from text
},
textWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
},

});

export default YourAccount;
