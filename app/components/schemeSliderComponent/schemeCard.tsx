import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import { Scheme } from './scheme';
const { width, height } = Dimensions.get('window');
import KccImg from "../../assets/images/HomeScreen/FindschemesForYou/kcc.svg";
interface Props extends Scheme {}

const SchemeCard: React.FC<Props> = ({
  title,
  subtitle,
  image,
  buttonText,
  activeIndex,
}) => {
  return (
    <View
      // style={activeIndex ? [styles.card, { width: width - 40 }] : styles.card}
      style={styles.card}
    >
      <View style={styles.cardContent}>
        <View style={{ height: '30%', width: '70%' }}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            position: 'relative',
            alignItems: 'center',
          }}
        >
          <View style={styles.textSection}>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '30%',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            {/* <Image
              source={image}
              style={styles.cardImage}
              resizeMode="contain"
            /> */}

            <KccImg/>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SchemeCard;

const styles = StyleSheet.create({
  card: {
    width: (width-32),
    aspectRatio: 1.62,
    borderRadius: 16,
    backgroundColor: '#1F3E29',
    padding: 6,
  },
  cardContent: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  textSection: {
    flex: 1,
    width: '40%',
    paddingRight: 14,
  },
  cardTitle: {
    fontFamily: 'Inter', // Make sure Inter is linked or loaded
    fontWeight: '700', // or 'bold' is fine too
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#ffffff',
  },
  cardSubtitle: {
    fontFamily: 'Inter', // Make sure Inter is loaded
    fontWeight: '400', // or just skip this if Inter-Regular is default
    fontSize: 12,
    lineHeight: 12, // 100% of fontSize (12)
    letterSpacing: 0,
    color: '#F7F7F7',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2B603A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontWeight: '400', // Regular weight
    fontSize: 12,
    lineHeight: 12, // 100% of font size
    letterSpacing: 0,
    color: '#ffffff',
    textAlign: 'center',
  },
  cardImage: {
    width: 180,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
