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
import CustomText from '../utils/customs/customText';
const { width, height } = Dimensions.get('window');
import ScanIcon from '../assets/images/Icons/scan.svg';
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
          <View style={{ flexDirection: 'column', gap: 12 }}>
            <View style={styles.logoRow}>
              <FarmerLogo />
              <CustomText
                weight={500}
                size={20}
                lineHeight={30}
                color="#ffffff"
              >
                Farme₹Pay
              </CustomText>
            </View>
            {/* <LinearGradient
              colors={[
                'rgba(239, 239, 239, 0.08)',
                'rgba(255, 255, 255, 0.64)',
              ]}
              start={{ x: -0.385, y: 0 }} // -38.5% in decimal form
              end={{ x: 1.0184, y: 0 }} // 101.84% in decimal form
              style={{
                borderRadius: 8,
                padding: 4,
                paddingHorizontal:6,
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}
            ><ScanIcon/>
              <CustomText weight={500} size={12} lineHeight={21} color='#fff'>My UPI ID: animesh@ybl</CustomText>
            </LinearGradient> */}
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
            <CustomText weight={600} size={16} color="#ffffff">
              Namaste,
            </CustomText>
            <CustomText weight={600} size={16} color="#FFAB00" lineHeight={18}>
              Animesh 🙏
            </CustomText>
            <CustomText size={12} color="#ffffff">
              How can we help you today?
            </CustomText>
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
    gap:4
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    gap: 8,
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  contentRow: {
    width: width-32,
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
    fontSize: 28,
    lineHeight: 35,
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
