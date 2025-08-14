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
  return (
    <View style={styles.wrapper}>
      <Text style={[textStyles.title,{paddingLeft:16}]}>Find Schemes for you</Text>

      <FlatList
      contentContainerStyle={{gap:12}}
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
      />
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
});
