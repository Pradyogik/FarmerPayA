import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import InsuranceCard from './insuranceCard';
import { Insurance } from './insurance';
import textStyles from '../../utils/constants/textStyles';

const insurances: Insurance[] = [
  {
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    emojiImage: require('../../assets/images/bimaYojna.png'),
    bgColor1: '#FF8B8B',
    bgColor2: '#FD0C10',
  },
  {
    title: 'Weather-Based Crop Insurance Scheme (WBCIS)',
    emojiImage: require('../../assets/images/weatherCrop.png'),
    bgColor1: '#C69EFF',
    bgColor2: '#9F00CB',
  },
  {
    title: 'Unified Package Insurance Scheme (UPIS)',
    emojiImage: require('../../assets/images/UPIS.png'),
    bgColor1: '#6A4ED9',
    bgColor2: '#020852',
  },
  {
    title: 'Find More Insurances of your need',
    emojiImage: require('../../assets/images/nextArrow.png'),
    bgColor1: '#FFECE5',
    bgColor2: '#FADDDA',
    titleColor:'#252E3D'
  },
    {
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    emojiImage: require('../../assets/images/bimaYojna.png'),
    bgColor1: '#FF8B8B',
    bgColor2: '#FD0C10',
  },
  {
    title: 'Weather-Based Crop Insurance Scheme (WBCIS)',
    emojiImage: require('../../assets/images/weatherCrop.png'),
    bgColor1: '#C69EFF',
    bgColor2: '#9F00CB',
  },
  {
    title: 'Unified Package Insurance Scheme (UPIS)',
    emojiImage: require('../../assets/images/UPIS.png'),
    bgColor1: '#6A4ED9',
    bgColor2: '#020852',
  },
  {
    title: 'Find More Insurances of your need',
    emojiImage: require('../../assets/images/nextArrow.png'),
    bgColor1: '#FFECE5',
    bgColor2: '#FADDDA',
    titleColor:'#252E3D'
  },
    
    
];

// Helper to chunk into groups of 4
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const { width } = Dimensions.get('window');
const PAGE_WIDTH = width - 32;

const InsuranceSlider: React.FC = () => {
  const grouped = chunkArray(insurances, 4); // 4 cards per page (2 rows x 2 cols)

  return (
    <View style={styles.container}>
      <Text style={[textStyles.title,{letterSpacing:-0.8, paddingHorizontal:16}]}>Featured Insurances</Text>

      <FlatList
      contentContainerStyle={{paddingHorizontal:16}}
        data={grouped}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `page-${index}`}
        renderItem={({ item }) => (
          <View style={styles.page}>
            <View style={styles.row}>
              {item.slice(0, 2).map((card, idx) => (
                <View key={`top-${idx}`} style={styles.cardWrapper}>
                  <InsuranceCard {...card} />
                </View>
              ))}
            </View>
            <View style={styles.row}>
              {item.slice(2, 4).map((card, idx) => (
                <View key={`bottom-${idx}`} style={styles.cardWrapper}>
                  <InsuranceCard {...card} />
                </View>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default InsuranceSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E0B8C',
    marginBottom: 12,
  },
  page: {
    width: PAGE_WIDTH,
    marginRight: 22,
    justifyContent: 'space-between',
    left:-10

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardWrapper: {
    width: '48%',
  },
});
