import React, { use, useRef, useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');
import BackArrow from '../../assets/images/Profile/backArrow.svg';
import Bot from '../../assets/images/Profile/bot.svg';
import Visa from '../../assets/images/Profile/Visa.svg';
import Cross from '../../assets/images/Profile/cross.svg';
import CameraIcon from '../../assets/images/Icons/cameraIcon.svg';
import { SvgProps } from 'react-native-svg';
interface cardProps {
  card: React.FC<SvgProps>;
}
const BankCards: cardProps[] = [
  { card: Visa },
  { card: Visa },
  { card: Visa },
  { card: Visa },
];

const formatCardNumber = (input: string) => {
  return input
    .replace(/\D/g, '') // Remove non-digits
    .replace(/(.{4})/g, '$1 ') // Add space every 4 digits
    .trim(); // Remove trailing space
};

const formatExpirationDate = (input: string) => {
  return input
    .replace(/\D/g, '') // Remove non-digits
    .replace(/(.{2})/g, '$1/') // Add slash every 2 digits
    .slice(0, 7) // Limit to MM/YY format
    .trim(); // Remove trailing space
};

const addCardDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dim = useWindowDimensions();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvvCode: '',
  });

  const handleCardNumber = (text: string) => {
    const formatted = formatCardNumber(text);
    setCardDetails({ ...cardDetails, cardNumber: formatted });
  };

  const handleExpirationDate = (text: string) => {
    const formatted = formatExpirationDate(text);
    setCardDetails({ ...cardDetails, expirationDate: formatted });
  };
  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {BankCards.map((_, i) => (
        <View
          key={i}
          style={i === activeIndex ? styles.activeDot : styles.inactiveDot}
        />
      ))}
    </View>
  );
  return (
    <LinearGradient
      colors={['#4506A0', '#6929C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          alignItems: 'center',
          elevation: 4,
          shadowColor: '#fff',
          height: height * 0.08,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <BackArrow />
          <Text
            style={{
              fontFamily: 'Inter-Medium', // or 'Inter' if you don’t have separate weights
              fontWeight: '500', // optional if using Inter-Medium font file
              fontSize: 14,
              lineHeight: 21,
              letterSpacing: 0,
              color: '#fff',
            }}
          >
            Add Card
          </Text>
        </View>
        <Bot />
      </View>
      <View
        style={{
          flex: 1,
          borderTopStartRadius: 32,
          borderTopEndRadius: 32,
          backgroundColor: '#fff',
        }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          <View style={{ gap: 12 }}>
            <FlatList
              style={{ marginTop: 32 }}
              data={BankCards}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={event => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / width,
                );
                setActiveIndex(index);
              }}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
              renderItem={({ item, index }) => {
                const CardIcon = item.card;
                return <CardIcon />;
              }}
            />
            {renderDots()}
          </View>
          <View style={{ marginHorizontal: 16, gap: 24, marginTop: 40 }}>
            <View style={{ gap: 12 }}>
              <Text style={styles.title}>Card Number</Text>
              <View style={styles.box}>
                <TextInput
                  placeholder="- - - -  - - - -  - - - -  - - - -"
                  placeholderTextColor="#888"
                  style={styles.inputText}
                  keyboardType="numeric"
                  maxLength={19} // 16 digits + 3 spaces
                  value={cardDetails.cardNumber}
                  onChangeText={handleCardNumber}
                />
                <CameraIcon />
              </View>
            </View>

            <View style={{ gap: 12 }}>
              <Text style={styles.title}>Card Holder Name</Text>
              <View style={styles.box}>
                <TextInput
                  placeholder="Enter your first and last name"
                  placeholderTextColor={'#888'}
                  value={cardDetails.cardHolderName}
                  onChangeText={text =>
                    setCardDetails({ ...cardDetails, cardHolderName: text })
                  }
                  style={styles.inputText}
                />
                {cardDetails.cardHolderName && (
                  <TouchableOpacity
                    onPress={() =>
                      setCardDetails({ ...cardDetails, cardHolderName: '' })
                    }
                  >
                    <Cross />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ gap: 12 }}>
                <Text style={styles.title}>Expiration Date</Text>
                <View style={[styles.box, { width: (dim.width - 48) / 2 }]}>
                  <TextInput
                    placeholder="MM/YY"
                    placeholderTextColor={'#888'}
                    value={cardDetails.expirationDate}
                    onChangeText={handleExpirationDate}
                    maxLength={5}
                    keyboardType="numeric"
                    style={styles.inputText}
                  />
                  {cardDetails.expirationDate && (
                    <TouchableOpacity
                      onPress={() =>
                        setCardDetails({ ...cardDetails, expirationDate: '' })
                      }
                    >
                      <Cross />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{ gap: 12 }}>
                <Text style={styles.title}>CVV Code</Text>
                <View style={[styles.box, { width: (dim.width - 48) / 2 }]}>
                  <TextInput
                    placeholder="* * *"
                    placeholderTextColor={'#888'}
                    value={cardDetails.cvvCode}
                    onChangeText={text =>
                      setCardDetails({ ...cardDetails, cvvCode: text })
                    }
                    maxLength={3}
                    secureTextEntry={true}
                    keyboardType="numeric"
                    style={styles.inputText}
                  />
                  {cardDetails.cvvCode && (
                    <TouchableOpacity
                      onPress={() =>
                        setCardDetails({ ...cardDetails, cvvCode: '' })
                      }
                    >
                      <Cross />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.buttonBox}>
              <Text style={[styles.inputText, { color: '#fff' }]}>
                Save Card
              </Text>
            </View>

            <View style={[styles.buttonBox, {backgroundColor:'#fff', borderColor:'#6929C4',borderWidth:1 }]}>
              <Text style={[styles.inputText, { color: '#54219D' }]}>
                Cancel
              </Text>
            </View>

          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default addCardDetails;
const styles = StyleSheet.create({
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
  title: {
    fontFamily: 'Inter-Medium', // Make sure the .ttf/.otf file is linked properly
    fontWeight: '500', // Optional if using specific weight font file
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.07, // 0.5% of 14px = 0.07 (14 * 0.005)
    color: '#000', // Add color if needed
  },
  box: {
    borderColor: '#C2C2C2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  inputText: {
    fontFamily: 'Inter-Regular', // make sure Inter-Regular.ttf exists
    fontWeight: '400', // optional if font file handles it
    fontSize: 14, // 16px is the base size, adjust as needed(14 px)
    lineHeight: 24,
    letterSpacing: 0.4, // 24% of 16 = 3.84, but that’s too big
    color: '#000', // set color if needed
  },
  buttonBox: {
    borderRadius: 48,
    backgroundColor: '#6929C4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
