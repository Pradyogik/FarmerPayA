import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import FarmerBigImg from '../assets/images/HomeScreen/Header/farmerBigImage.svg';
import FarmerLogo from '../assets/images/HomeScreen/Header/farmerLogo.svg';
import TranslatorIcon from '../assets/images/Icons/translatorIcon.svg';
import NotificationIcon from '../assets/images/Icons/notificationIcon.svg';
const { width, height } = Dimensions.get('window');

const Header = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={['#6929C4', '#4506A0']}
      start={{ x: 0.15, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content" // or "dark-content" based on your gradient
      />
      <ImageBackground
        source={require('../assets/images/grid.png')} // use your image path
        resizeMode="cover"
        style={styles.grid}
      >
        <View style={styles.topRow}>
          <View style={styles.logoRow}>
            <FarmerLogo />
            <Text style={styles.appName}>Farme₹Pay</Text>
          </View>
          <View style={styles.iconsRow}>
            <TouchableOpacity style={styles.iconButton}>
              <TranslatorIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                navigation.navigate('Notification');
              }}
            >
              <NotificationIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.textBlock}>
            <Text style={styles.greeting}>Namaste,</Text>
            <Text style={styles.username}>Animesh 🙏</Text>
            <Text style={styles.subText}>How can we help you today?</Text>
          </View>
          {/* <Image
            source={require('../assets/images/farmer.png')} // illustration image
            style={styles.farmerImg}
            resizeMode="contain"
          /> */}
          <FarmerBigImg />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingTop: 12,
  },
  grid: {
    width: width,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: StatusBar.currentHeight || 40,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  appName: {
    fontFamily: 'Inter-Medium', // This must match the internal name in the TTF
    fontWeight: '500', // Optional if font file handles the weight
    fontSize: 24,
    lineHeight: 24, // 100% of font size
    letterSpacing: -0.96, // -4% of 24px
    color: '#fff',
    marginLeft: 8,
  },

  logo: {
    width: 30,
    height: 40,
    opacity: 2,
    resizeMode: 'contain',
  },
  iconsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  contentRow: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  textBlock: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter-SemiBold', // or just 'Inter' depending on how fonts are linked
    fontWeight: '600', // optional if font file is specific weight
    lineHeight: 20, // 100% of fontSize
    letterSpacing: 0, // default is 0
    textAlignVertical: 'center', // only supported on Android
  },
  username: {
    fontFamily: 'Inter-SemiBold', // Must be correctly linked
    fontWeight: '600', // Optional if font file handles weight
    fontSize: 16,
    lineHeight:35,
    letterSpacing: 0,
    color: '#FFAB00',
    marginVertical: 2,
  },

  subText: {
    fontFamily: 'Inter-Light', // depends on how font is loaded
    fontWeight: '300', // optional if font file handles it
    fontSize: 14,
    lineHeight: 16.72, // 16 * 1.17
    letterSpacing: 0, // -4% of 16
    color: 'white',
  },
});

export default Header;
