import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import SchemeCard from './schemeCard';
import { Scheme } from './scheme';
import textStyles from '../../utils/constants/textStyles';


const schemes: Scheme[] = [
  {
    title: 'Have You Got Your Kisan Credit Card (KCC) Yet?',
    subtitle: 'Instant access to low-interest farm loans & subsidies.',
    image: require('../../assets/images/kcc.png'),
    buttonText: 'Check Now',
  },
  {
    title: 'Get Zero-Interest Crop Loans!',
    subtitle: 'Special seasonal credit for small and marginal farmers.',
    image: require('../../assets/images/kcc.png'),
    buttonText: 'Apply',
  },
    {
    title: 'Get Zero-Interest Crop Loans!',
    subtitle: 'Special seasonal credit for small and marginal farmers.',
    image: require('../../assets/images/kcc.png'),
    buttonText: 'Apply',
  },
    {
    title: 'Get Zero-Interest Crop Loans!',
    subtitle: 'Special seasonal credit for small and marginal farmers.',
    image: require('../../assets/images/kcc.png'),
    buttonText: 'Apply',
  },
    {
    title: 'Get Zero-Interest Crop Loans!',
    subtitle: 'Special seasonal credit for small and marginal farmers.',
    image: require('../../assets/images/kcc.png'),
    buttonText: 'Apply',
  },
  // More cards can be added here
];

const SchemeSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const width = Dimensions.get('window').width;
  const isFirst = 0;
  const isLast = schemes.length - 1;

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {schemes.map((_, i) => (
        <View
          key={i}
          style={i === activeIndex ? styles.activeDot : styles.inactiveDot}
        />
      ))}
    </View>
  );
  return (
    <View style={styles.wrapper}>
      <Text style={[textStyles.title,{paddingLeft:16}]}>Find Schemes for you</Text>

      <FlatList
        data={schemes}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item, index }) => (
          <View
            style={[styles.slider,
              index === isFirst && styles.isFirstSlider,
              index === isLast && styles.isLastSlider,
            ]}
          >
            <SchemeCard {...item} activeIndex={index === activeIndex} />
          </View>
        )}
        pagingEnabled
      />
      {renderDots()}
    </View>
  );
};

export default SchemeSlider;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E0B8C',
    marginBottom: 12,
  },
  slider:{
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
    marginTop: 8,
  },
  activeDot: {
    width: 16,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1F077A',
    marginHorizontal: 4,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C0C0C0',
    marginHorizontal: 4,
  },
});
