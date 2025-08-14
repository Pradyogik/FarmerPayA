import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from './circularBar';
import LinearGradient from 'react-native-linear-gradient';
import textStyles from '../utils/constants/textStyles';
import CustomText from '../utils/customs/customText';

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

        <View style={styles.textSection}>
          <CustomText weight={600} size={14} color='#1F077A'>
            Profile Status: {progress}% Complete
          </CustomText>
          <CustomText weight={400} size={12} color='#1F077AB2'>
            Please complete your profile to gain full access to all services
          </CustomText>
        </View>

        <CircularProgress progress={progress} />
 
      </LinearGradient>
    </View>
    
  );
};

export default ProfileStatusCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom:24
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    aspectRatio:3.5090,
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 16,
    elevation: 1,
  },
  textSection: {
    maxWidth: '80%',
    paddingRight: 2,
  },
statusTitle: {
  fontFamily: 'Inter-SemiBold',    // Must match internal font name from .ttf
  fontWeight: '600',               // Optional if font handles it
  fontSize: 14.96,  //line height change from 18.96 to 14.96 to make sutiable with the screen 
  lineHeight: 14.96,
  letterSpacing: -0.76,            // Rounded from -0.7584
  color: '#1F077A',
  marginBottom: 4,
},
description: {
  fontFamily: 'Inter-Regular',      // Must match actual internal font name
  fontWeight: '400',
  fontSize: 11,
  lineHeight: 13,
  letterSpacing: -0.59,             // Rounded from -0.5896
  color: '#1F077AB2',               // Semi-transparent indigo
},

});
