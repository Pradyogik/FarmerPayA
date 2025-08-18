import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CircularProgress from './circularBar'; // <-- this file is below
import textStyles from '../utils/constants/textStyles'; // keep using your shared styles if you have them

const PRIMARY = '#54219D';

const ProfileStatusCard = () => {
  const progress = 70;

  return (
    <View style={styles.container}>
      {/* Section title */}
      <Text style={[styles.sectionTitle, textStyles?.title]}>Onboarding</Text>

      {/* Card */}
      <LinearGradient
        colors={['#E9EBFC', '#F5F4FA', '#E9EBFC']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.card}
      >
        <View style={styles.textBlock}>
          <Text style={styles.statusTitle}>
            Profile Status: {progress}% Complete
          </Text>
          <Text style={styles.description}>
            Please complete your profile to gain full access to all services
          </Text>
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
  },

  statusTitle: {
    fontFamily: 'Inter', // Inter font
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.2,
    color: '#1F077A',
    marginBottom: 4,
  },

  description: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#1F077A' + 'B2', // #1F077AB2
  },
});
