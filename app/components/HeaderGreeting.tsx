import React from 'react';
import {
  View,
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
import Text from './Text/Text';


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
        barStyle="light-content" // or "dark-content" based on your gradient
      />
      <ImageBackground
        source={require('../assets/images/grid.png')} // use your image path
        resizeMode="cover"
        style={styles.grid}
      >
        <View style={styles.topRow}>
          <View style={styles.logoRow}>
            <FarmerLogo />
            <Text  style={styles.appName} fontWeight='600'>Farme₹Pay</Text>
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
            <Text style={styles.greeting} fontWeight='500'>Namaste,</Text>
            <Text style={styles.username} fontWeight='600'>Animesh <Image source={require("../assets/images/namaste.webp")} style={styles.namaste}/></Text>
            <Text style={styles.subText} fontWeight='500'>How can we help you today?</Text>
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
    fontSize: 24,
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
    fontSize: 20,
    color: 'white',

    lineHeight: 20, 
    letterSpacing: 0, 
    textAlignVertical: 'center', 
  },
  username: {
    fontSize: 28,
    lineHeight:35,
    letterSpacing: 0,
    color: '#FFAB00',
    marginVertical: 2,
  },

  subText: {
    fontSize: 14,
    lineHeight: 16.72, // 16 * 1.17
    letterSpacing: -0.5, // -4% of 16
    color: 'white',
  },
  namaste:{
    width:25,
    height:25
  }
});

export default Header;
