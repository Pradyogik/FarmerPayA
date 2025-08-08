import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import LoanCard from './AdCard';
import { AdCardProps } from './Ad';

const { width } = Dimensions.get('window');

const ads: AdCardProps[] = [
  {
    title: 'Seed Loans up to ₹10,000 ➜',
    subtitle: 'Buy seeds now, pay later with easy EMI options',
    image: require('../../assets/images/loan.png'),
  },
  {
    title: 'Fertilizer Credit Available',
    subtitle: 'Get fertilizers now, pay later with 0% interest',
    image: require('../../assets/images/loan.png'),
  },
  {
    title: 'Need help with Equipment?',
    subtitle: 'We provide equipment loans in 24 hours',
    image: require('../../assets/images/loan.png'),
  },
];

const AdSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef(null);
  const width = Dimensions.get('window').width;
  const isFirst = 0;
  const isLast = ads.length - 1;

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {ads.map((_, i) => (
        <View
          key={i}
          style={i === activeIndex ? styles.activeDot : styles.inactiveDot}
        />
      ))}
    </View>
  );

  return (
    <View>
      <FlatList
        data={ads}
        ref={flatRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `ad-${index}`}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item ,index}) => (
          <View
            style={[
              styles.slider,
              index === isFirst && styles.isFirstSlider,
              index === isLast && styles.isLastSlider,
            ]}
          >
          <LoanCard
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            onPress={() => {}}
            isActive={false} // you can remove isActive if not needed anymore
            index={0}         // and also index/total
            total={0}
          />
          </View>
        )}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  isFirstSlider: {
    paddingLeft: 16,
  },
  isLastSlider: {
    paddingRight: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  activeDot: {
    width: 15,
    height: 9,
    backgroundColor: '#4506A0',
    borderRadius: 20,
  },
  inactiveDot: {
    width: 9,
    height: 9,
    backgroundColor: '#DEDEDE',
    borderRadius: 4.5,
  },
});

export default AdSlider;
