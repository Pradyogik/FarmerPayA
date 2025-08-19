import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { DetailCardProps } from './detail';

const { width, height } = Dimensions.get('window');

const DetailCard: React.FC<DetailCardProps> = ({
  title,
  subtitle,
  buttonLabel,
  image,
  onPress,
}) => {
  return (
    <View style={styles.card}>
  <Text style={styles.title}>{title}</Text>
  <Text style={styles.subtitle}>{subtitle}</Text>

  {/* Button */}
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{buttonLabel}</Text>
  </TouchableOpacity>

  {/* Overlapping image */}
  <Image source={image} style={styles.image} />
</View>

  );
};
export default DetailCard;

const cardWidth = 208; 
const cardHeight = 166; 

const styles = StyleSheet.create({
card: {
  width: cardWidth,
  height: cardHeight,
  backgroundColor: '#FFFDFC',
  borderRadius: 16,
  padding: 16,
  marginRight: 16,
  borderColor: '#C0C0C0',
  borderWidth: 1,
  position: 'relative', // Important for absolute positioning inside
},
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#1F077A',
  },
subtitle: {
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 12,
  lineHeight: 12,
  color: 'rgba(31, 7, 122, 0.6)',
  marginVertical: 8,
  flexShrink: 1,
  paddingRight: 60, // So text doesn’t hide behind image
},
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
image: {
  width: 90,
  height: 100,
  resizeMode: 'contain',
  position: 'absolute',
  bottom: 4,   // distance from bottom
  right: 2,    // distance from right
  zIndex: 1,
},
button: {
  backgroundColor: '#1F077A',
  height: 28,
  paddingHorizontal: 12,
  borderRadius: 8,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 4,
  alignSelf: 'flex-start',
},
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 10,
  },
});
