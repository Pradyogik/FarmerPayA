import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AdCardProps } from './Ad';

const { width } = Dimensions.get('window');

type Props = AdCardProps & {
  isActive: boolean;
  index: number;
  total: number;
};
const LoanCard: React.FC<Props> = ({ title, subtitle, image, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={{ width: '20%', right: 16, bottom: -4 }}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: (width-34),
    aspectRatio:3,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal:1
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#020852',
    width:'100%',
    aspectRatio:3.8,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    width:'70%'
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#fff',
    letterSpacing: -0.66,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    letterSpacing: -0.56,
  },
  image: {
    width: '100%',
    aspectRatio:1,
    resizeMode:'contain'
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
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

export default LoanCard;
