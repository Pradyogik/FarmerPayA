import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';

import HeaderGreeting from '../components/HeaderGreeting';
import ProfileStatusBar from '../components/ProfileStatusBar';
import FarmerPayUPI from '../components/FarmerPayUPI';
import AIAdvisory from '../components/AIadvisory';
import SchemeSlider from '../components/schemeSliderComponent/schemeSlider';
import InsuranceSlider from '../components/insuranceSliderComponent/insuranceSlider';
import AddDetailSlider from '../components/detailsSlider/detailSlider';
import RecommendedVideoSlider from '../components/recommendedVideoCard.tsx/videoCardSlider';
import Services from '../components/ServiceCard';
import { InView, IOScrollView } from 'react-native-intersection-observer';
import CheckBalanceCard from '../components/Profile/checkBalance';
import AdSlider from '../components/AdSlider/AdCardSlider';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [aiVisible, setAiVisible] = useState(false);
  return (
    <View style={styles.rootContainer}>
      <IOScrollView style={styles.container}>
        <HeaderGreeting navigation={navigation} />

        <ProfileStatusBar />
        {/* <Services /> */}
        <FarmerPayUPI />
        <AdSlider />
        
        <InView
          onChange={inView => {
            setAiVisible(inView);
          }}
          triggerOnce={false}
        >
          <AIAdvisory inView={aiVisible} navigation={navigation} />
        </InView>

        <SchemeSlider />
        <InsuranceSlider />
        <AddDetailSlider />
        <RecommendedVideoSlider />

        <Image
          source={require('../assets/images/bottomImage.png')}
          style={styles.image}
        />
      </IOScrollView>

      {/* Floating Icon */}
      <TouchableOpacity
        onPress={() => {
          console.log('Floating icon pressed');
        }}
        style={styles.floatingButton}
      >
        <Image
          source={require('../assets/images/mic.png')}
          style={styles.floatingIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: width,
  },
  container: {
    width: width,
    backgroundColor: '#fff',
  },
  image: {
    marginTop: 40,
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
  },
  floatingButton: {
    position: 'absolute',
    width: 71,
    height: 71,
    borderRadius: 35.5,
    backgroundColor: '#6929C4', // or use a gradient if needed
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30, // Replace `top: 779` with bottom for responsive layout
    right: 10, // Replace `left: 356` with right for alignment on all screens
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  floatingIcon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
});

export default HomeScreen;
