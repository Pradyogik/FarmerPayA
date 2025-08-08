import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from './circularBar';
import LinearGradient from 'react-native-linear-gradient';
import textStyles from '../utils/constants/textStyles';

const ProfileStatusCard = () => {
  const progress = 70;

  return (

    <View style={styles.container}>
      <Text style={textStyles.title}>Onboarding</Text>
      
          <LinearGradient
            colors={['#E9EBFC', '#F5F4FA', '#E9EBFC']}
            locations={[0, 0.5029, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.card}
          >

        <View style={styles.textSection}>
          <Text style={styles.statusTitle}>
            Profile Status: {progress}% Complete
          </Text>
          <Text style={styles.description}>
            Please complete your profile to gain full access to all services
          </Text>
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
