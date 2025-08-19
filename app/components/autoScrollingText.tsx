import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Easing,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const AutoScrollingText = () => {
  const messages = [
    { text: 'Empowering Farmers, One Tap at a Time.', color: '#3D65CA' },
    { text: 'Your Harvest, Your Story, Your Price.', color: '#54219D' },
    { text: 'Grow Smarter, Earn More.', color: '#FFA500' },
  ];

  const itemHeight = 150;
  const translateY = useRef(new Animated.Value(0)).current;
  const indexRef = useRef(0);

  const animateStep = () => {
    indexRef.current++;

    Animated.timing(translateY, {
      toValue: -itemHeight * indexRef.current,
      duration: 600,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        if (indexRef.current === messages.length - 1) {
          // reset to start after short delay
          Animated.timing(translateY, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }).start(() => {
            indexRef.current = 0;
            setTimeout(animateStep, 1000); // pause before looping
          });
        } else {
          animateStep(); // continue to next item
        }
      }, 3000); // display duration for each item
    });
  };

  useEffect(() => {
    animateStep();
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {messages.map((msg, i) => (
          <View key={i} style={[styles.item, { height: itemHeight }]}>
            <Text style={[styles.titleText, { color: msg.color }]}>{msg.text}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 145, // visible height = one item
    overflow: 'hidden',
    paddingHorizontal: 24,
    marginTop: screenHeight * 0.1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 26,
    fontWeight: '600',
  },
});

export default AutoScrollingText;
