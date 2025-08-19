import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import textStyles from '../utils/constants/textStyles';
import CircularProgress from './circularBar'; // <-- this file is below
import CustomText from '../utils/customs/customText';
const PRIMARY = '#54219D';

const ProfileStatusCard = () => {
  const progress = 70;

  return (
    <View style={styles.container}>
      <CustomText weight={600} lineHeight={24} color='#3F1976' style={{marginBottom:10}} >Onboarding</CustomText>
      
          <LinearGradient
            colors={['#E9EBFC', '#F5F4FA', '#E9EBFC']}
            locations={[0, 0.5029, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.card}
          >

        <View style={styles.textBlock}>
          <CustomText weight={600} size={14} color='#1F077A'>
            Profile Status: {progress}% Complete
          </CustomText>
          <CustomText weight={400} size={12} color='#1F077AB2'>
            Please complete your profile to gain full access to all services
          </CustomText>
        </View>

        {/* Smoothly animates to 70% when mounted */}
        <CircularProgress
          target={progress}
          size={60}
          strokeWidth={6}
          tintColor={PRIMARY}
          trackColor="#DCCEF6"
          duration={900}
        />
      </LinearGradient>
    </View>
  );
};

export default ProfileStatusCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },

  sectionTitle: {
    // fallback if textStyles.title isn’t present
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 22,
    color: '#1F2937',
    fontWeight: '800',
    marginBottom: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 16,
    minHeight: 96, // more reliable than aspectRatio for variable text sizes
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
    }),
  },

  textBlock: {
    flex: 1,
    paddingRight: 12,
    maxWidth: '75%',
  },
statusTitle: {
  fontFamily: 'Inter-SemiBold',    // Must match internal font name from .ttf
  fontWeight: '600',               // Optional if font handles it
  fontSize: 16,  //line height change from 18.96 to 14.96 to make sutiable with the screen 
  lineHeight: 16,
  letterSpacing: 0,            // Rounded from -0.7584
  color: '#1F077A',
  marginBottom: 8,
},
description: {
  fontFamily: 'Inter-Regular',      // Must match actual internal font name
  fontWeight: '400',
  fontSize: 14,
  lineHeight: 14,
  letterSpacing: 0,             // Rounded from -0.5896
  color: '#1F077AB2',               // Semi-transparent indigo
},

});
