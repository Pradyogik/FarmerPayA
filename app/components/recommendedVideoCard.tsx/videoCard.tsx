import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Define % width of screen you want to use (e.g. 75%)
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = CARD_WIDTH * 9 / 14; // 16:9 aspect ratio

interface VideoCardProps {
  image: ImageSourcePropType;
}

const VideoCard: React.FC<VideoCardProps> = ({ image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,

    overflow: 'hidden',


    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode:'contain'
  },
});
