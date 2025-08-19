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
import colors from '../../assets/colors.tsx';
//import { Image } from 'react-native-svg';
import LargeButton from '../../utils/customs/LargeButton.tsx';

const { height, width } = Dimensions.get('window');

export default function ProfileEditScreen({ navigation }: any) {
  const [name, setName] = useState('ABC Kumar');
  const [currentMobile, setCurrentMobile] = useState('9745863210');
  const [newMobile, setNewMobile] = useState('9876543210');
    const [selected, setSelected] = useState('Farmer'); 
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
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Right side */}
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Icon name="dots-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarOuter}>
            <Image
              source={require('../../assets/images/Profile/dp.jpg')} // replace
              style={styles.avatar}
            />
          </View>

          {/* small edit icon overlapping bottom center */}
          <TouchableOpacity style={styles.avatarEditBtn} activeOpacity={0.8}>
            <Image source={require('../../assets/images/Profile/edit.png')}/>
          </TouchableOpacity>
        </View>

        {/* Input Card */}
        <View style={styles.card}>
          
          <LabeledInput
            label="Edit Name"
            iconName="account"
            value={name}
            onChangeText={setName}
            placeholder="Enter Full Name"
          />

          <LabeledInput
            label="Current Mobile Number"
            iconName="phone"
            value={currentMobile}
            onChangeText={setCurrentMobile}
            placeholder="9745863210"
            keyboardType="phone-pad"
          />

          <LabeledInput
            label="Change Mobile Number"
            iconName="phone"
            value={newMobile}
            onChangeText={setNewMobile}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
          />

          <Text style={styles.microcopy}>
            To ensure security, we’ll verify this request with an OTP sent to your current registered mobile and email.
          </Text>
          <View style={styles.button }>
            <LargeButton title="Get OTP"  onPress={ () => navigation.navigate('OtpScreen', { mobile: setNewMobile })}/>
          </View>
          {/* Persona selector */}
          // Persona Selector
<Text style={[styles.sectionTitle, { marginTop: 20 }]}>Switch Persona</Text>
<View style={styles.row}>
  {/* Agent */}
  <TouchableOpacity
    style={[
      styles.card2,
      selected === 'Agent' && styles.selectedCard
    ]}
    onPress={() => setSelected('Agent')}
    activeOpacity={0.8}
  >
    <Image
      source={require('../../assets/images/Profile/agent.png')}
      style={styles.icon}
    />
    <Text
      style={[
        styles.cardText,
        
      ]}
    >
      Agent
    </Text>
  </TouchableOpacity>

  {/* OR */}
  <Text style={styles.orText}>OR</Text>

  {/* Farmer */}
  <TouchableOpacity
    style={[
      styles.card2,
      selected === 'Farmer' && styles.selectedCard
    ]}
    onPress={() => setSelected('Farmer')}
    activeOpacity={0.8}
  >
    <Image
      source={require('../../assets/images/Profile/farmer.png')}
      style={styles.icon}
    />
    <Text
      style={[
        styles.cardText,
        
      ]}
    >
      Farmer
    </Text>
  </TouchableOpacity>
</View>


        </View>

        {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

          
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const LabeledInput = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}: {
  label?: string;
  iconName: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
}) => {
  return (
    <View style={{ marginBottom: 12 }}>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
      <View style={styles.inputBox}>
        <Icon name={iconName} size={18} color={colors.neutral[600]} style={{ marginRight: 10 }} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral[500]}
          style={styles.input}
          keyboardType={keyboardType}
        />
      </View>
    </View>
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
    container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  avatarWrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarOuter: {
    width: 208,
    height: 198,
    borderRadius: 200 ,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarEditBtn: {
    paddingTop : 12,
  },

  /* Card */
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 18,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily:'Inter-SemiBold',
    color: colors.neutral[900],
    fontWeight: '600',
    marginBottom: 8,
  },

  inputLabel: {
    fontSize: 14,
    fontFamily:'Inter-SemiBold',
    lineHeight:24,
    fontWeight:'500',
    color: '#121212DE',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
    borderColor: colors.neutral[300],
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.neutral[1000],
  },

  microcopy: {
    fontSize: 12,
    fontFamily:'Inter-Medium',
    fontWeight:'500',
    color: colors.neutral[900],
    marginTop: 10,
    lineHeight: 16,
  },
  button:{
    padding : 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card2: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCard: {
    backgroundColor: '#F3E8FF', // light purple
    borderColor: '#8B5CF6', // purple border
  },
  icon: { width: 50, height: 50, marginBottom: 8 },
  cardText: { fontSize: 14, fontWeight: '500' },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  orText: {
    fontFamily:'Inter-Bold',
    fontSize:14,
    lineHeight:21,
    alignContent:'center',
    alignItems:'center',
    color: '##000000',
    fontWeight: '700',
  },

  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#6929C4',
    borderRadius: 24,
    marginRight: 12,
  },
  cancelText: { color: '#6929C4', fontWeight: '500' },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: '#6929C4',
    borderRadius: 24,
  },
  saveText: { color: '#fff', fontWeight: '500' },
});