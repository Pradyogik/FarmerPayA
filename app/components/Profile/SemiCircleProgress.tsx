import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  progress: number; // 0 to 1
}

const SemiCircleProgress: React.FC<Props> = ({ progress }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const fullArcLength = Math.PI * 140;
  const [dashArray, setDashArray] = useState(`0, ${fullArcLength}`);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    const listener = animatedProgress.addListener(({ value }) => {
      const arc = fullArcLength * value;
      setDashArray(`${arc}, ${fullArcLength}`);
    });

    return () => {
      animatedProgress.removeListener(listener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={160} height={100} viewBox="0 0 160 80">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#FFCD71" />
            <Stop offset="100%" stopColor="#FFF7E8" />
          </LinearGradient>
        </Defs>

        {/* Background semicircle */}
        <Path
          d="M 10 70 A 70 70 0 0 1 150 70"
          stroke="#FFF7E8"
          strokeWidth={12}
          fill="none"
          strokeLinecap="round"
        />

        {/* Animated progress arc */}
        <AnimatedPath
          d="M 10 70 A 70 70 0 0 1 150 70"
          stroke="url(#grad)"
          strokeWidth={12}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={dashArray}
        />
      </Svg>

      <View style={styles.overlay}>
        <Text style={styles.score}>{Math.round(progress * 100)}/100</Text>
      </View>
    </View>
  );
};

export default SemiCircleProgress;

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 100, // Increased to prevent clipping
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible', // prevents any clipping
  },
  overlay: {
    position: 'absolute',
    top: 38, // Adjust this to fine-tune placement
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#250E45',
  },
});
