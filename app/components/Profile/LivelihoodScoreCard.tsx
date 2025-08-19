import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SemiCircleProgress  from './SemiCircleProgress';
import Productivity from '../../assets/images/Profile/productivity.svg';
import Financial from '../../assets/images/Profile/rupee.svg';
import Risk from '../../assets/images/Profile/risk.svg';
import Engagement from '../../assets/images/Profile/engagement.svg';
import Sound from '../../assets/images/Profile/sound.svg';
import MedalIcon from '../../assets/images/Profile/medal.svg';
import Medal from '../../assets/images/Profile/medal.svg';

interface ScoreSection {
  label: string;
  icon: React.ReactNode;
  value: number;
  total: number;
  color: string;
}

const scoreSections: ScoreSection[] = [
  { label: 'Productivity', icon: <Productivity width={20} height={20} />, value: 30, total: 40, color: '#6929C4' },
  { label: 'Financial Health', icon: <Financial width={20} height={20} />, value: 20, total: 30, color: '#1FC16B' },
  { label: 'Risk Exposure', icon: <Risk width={20} height={20} />, value: 15, total: 20, color: '#FB3748' },
  { label: 'Engagement', icon: <Engagement width={20} height={20} />, value: 8, total: 10, color: '#FFDB43' },
];

const LivelihoodScoreCard: React.FC = () => {
  const totalScore = 75;
  const maxScore = 100;

  return (
    <View style={styles.card}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>My Livelihood Score</Text>
      </View>

      <View style={styles.scoreWrapper}>
        <View style={styles.semiCircleClipper}>
          <SemiCircleProgress progress={0.75} />

        </View>

        <Medal width={50} height={50}/>
      </View>

      {scoreSections.map((section, index) => (
        <View style={styles.sectionRow} key={index}>
          <View style={styles.sectionHeader}>
            <View style={styles.leftAligned}>
              {section.icon}
              <Text style={styles.sectionLabel}>{section.label}</Text>
            </View>
            <View style={styles.rightAligned}>
              <Text style={styles.scoreText}>{section.value}/{section.total}</Text>
              <Sound width={20} height={20} />
            </View>
          </View>
          <Progress.Bar
            progress={section.value / section.total}
            width={null}
            height={8}
            color={section.color}
            unfilledColor="#E0E0E0"
            borderWidth={0}
            borderRadius={8}
            style={styles.progressBar}
          />
        </View>
      ))}

      <Text style={styles.lastUpdated}>Last Updated: 30 June, 2025</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
  borderRadius: 12,
  backgroundColor: '#F8F8F8',     // light grey for card (not screen)
  borderWidth: 1,
  borderColor: '#C0C0C0',
  padding: 12,
  shadowColor: 'transparent',     // remove shadow if unwanted
  elevation: 0, 
},
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  scoreWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  semiCircleClipper: {
    height: 100, // was 60, now fits full SVG
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible', // prevent clipping
  },
  medalIcon: {
    marginTop: 8,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  sectionRow: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
    color: '#250E45',
  },
  progressBar: {
    borderRadius: 4,
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#252525',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#656565',
    textAlign: 'center',
    marginTop: 8,
  },
  leftAligned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rightAligned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});

export default LivelihoodScoreCard;