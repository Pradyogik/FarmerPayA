import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DualAnimatedRows3 from '../../components/animation3';
import AutoScrollingText from '../../components/autoScrollingText';
import LargeButton from '../../utils/customs/LargeButton';

const { width, height } = Dimensions.get('window');

const SplashScreen2 = ({navigation}:any) => {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const savedUserId = await AsyncStorage.getItem('user_id');
        if (savedUserId) {
          navigation.replace('Main', { user_id: savedUserId });
        }
      } catch (err) {
        console.log('Error reading user_id:', err);
      }
    };

    checkLogin();
  }, []);
  return (
    <View style={styles.background}> 
      
      <ImageBackground
        source={require('../../assets/images/aiBgSmall.png')}
        style={{height:200,marginTop:55,width:width}}
        resizeMode="contain"
      >
        <DualAnimatedRows3 inView={true} navigation={navigation}/>
      </ImageBackground>
      {/* Text */}
      <View style={styles.centerTextContainer}>
        <AutoScrollingText/>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonWrapper}>
        <LargeButton title="Continue" onPress={()=>{navigation.navigate('selectLanguage')}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pillsContainer: {
    marginTop: height * 0.15,
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'flex-start',
    gap: 10,
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 40,
    marginBottom: 8,
  },
  pillText: {
    fontSize: 16,
    color: '#1F077A',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  centerTextContainer: {
    marginTop: height * 0.05,
    paddingHorizontal: 24,
    maxHeight: 280
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#54219D',
    textAlign: 'center',
    lineHeight: 42,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
    alignItems: 'center',
    marginHorizontal:16
  },
  button: {
    backgroundColor: '#54219D',
    borderRadius: 48,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width:'100%',
    alignItems:'center'

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});

export default SplashScreen2;
