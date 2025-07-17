import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import DualAnimatedRows3 from '../components/animation3';
import AutoScrollingText from '../components/autoScrollingText';

const { width, height } = Dimensions.get('window');

const SplashScreen2 = ({navigation}:any) => {
  return (
    <View style={styles.background}> 
    <ImageBackground
      source={require('../assets/images/aiBgSmall.png')}
      style={{height:200,marginTop:55,width:width}}
      resizeMode="contain"
    ><DualAnimatedRows3 inView={true} navigation={navigation}/>
    </ImageBackground>
      {/* Text */}
<View style={styles.centerTextContainer}>
  <AutoScrollingText/>
</View>

      {/* Continue Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button}  onPress={()=>{navigation.navigate('selectLanguage')}}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
    maxHeight: 250
  },
  titleText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#54219D',
    textAlign: 'center',
    lineHeight: 42,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#54219D',
    borderRadius: 48,
    paddingVertical: 14,
    paddingHorizontal: 32,
    minWidth: 200,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});

export default SplashScreen2;
