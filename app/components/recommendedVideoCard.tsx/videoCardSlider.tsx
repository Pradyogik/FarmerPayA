import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import VideoCard from './videoCard';
import textStyles from '../../utils/constants/textStyles';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 280 + 16; // card width + marginRight

const videoData = [
  { id: '1', image: require('../../assets/images/vc1.png') },
  { id: '2', image: require('../../assets/images/vc1.png') },
  { id: '3', image: require('../../assets/images/vc1.png') },
  { id: '4', image: require('../../assets/images/vc1.png') },
  { id: '5', image: require('../../assets/images/vc1.png') },
];

const RecommendedVideoSlider: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Text style={[textStyles.title,{ paddingHorizontal:10}]}>Recommended Videos for you</Text>

      <Animated.FlatList
        data={videoData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1.15, 0.95],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={{ transform: [{ scale }] }}>
              <VideoCard image={item.image} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default RecommendedVideoSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E0B8C',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});