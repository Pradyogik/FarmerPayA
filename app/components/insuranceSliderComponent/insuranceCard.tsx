import React from 'react';
import { View, Text, StyleSheet, Image , Dimensions, TouchableOpacity } from 'react-native';
import { Insurance } from './insurance';
import LinearGradient from 'react-native-linear-gradient';
const{width, height}=Dimensions.get('window');
const InsuranceCard: React.FC<Insurance> = ({ title, emojiImage, bgColor1 ,bgColor2 , titleColor}) => {
  return (
    <View style={[styles.card]}>
      <TouchableOpacity>
      <LinearGradient
        colors={[bgColor1, bgColor2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      > 
      <Text style={[styles.title, {color:titleColor || '#FFFFFF'}]}>{title}</Text>
      <Image source={emojiImage} style={styles.emoji}/></LinearGradient></TouchableOpacity>
    </View>
  );
};

export default InsuranceCard;

const styles = StyleSheet.create({
  card: {
    width: (width-48)/2,
    aspectRatio:0.9303,
    borderRadius: 16,
    padding: 12,
    marginRight:6,
    flexDirection:'column',
    justifyContent: 'space-between',

  },
title: {
  fontFamily: 'Inter',
  fontWeight: '700',         // or 'bold'
  fontSize: 14,
  lineHeight: 14,            // 100% of fontSize
  letterSpacing: 0,      // -4% of 18px = -0.72
  color: '#000000',          // optional, set as needed
}
,
  emoji: {
    fontSize: 32,
    alignSelf: 'flex-end',
  },
});
