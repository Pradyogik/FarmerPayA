// components/circularBar.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  target: number;          // 0..100
  size?: number;           // px
  strokeWidth?: number;    // px
  tintColor?: string;      // progress color
  trackColor?: string;     // track color
  duration?: number;       // ms
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<Props> = ({
  target,
  size = 72,
  strokeWidth = 8,
  tintColor = '#54219D',
  trackColor = '#E5E7EB',
  duration = 900,
}) => {
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const anim = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(0);

  // Animate to target (clamped 0..100)
  useEffect(() => {
    const to = Math.max(0, Math.min(100, target));
    Animated.timing(anim, {
      toValue: to,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // we animate strokeDashoffset (layout prop)
    }).start();
  }, [target, duration, anim]);

  // Keep a numeric label in sync (0..100)
  useEffect(() => {
    const id = anim.addListener(({ value }) => {
      setDisplay(Math.round(value));
    });
    return () => anim.removeListener(id);
  }, [anim]);

  // Map 0..100 => circumference..0
  const dashOffset = anim.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        {/* Progress (starts at 12 o’clock) */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={tintColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Label */}
      <View style={styles.center}>
        <Text style={styles.percent}>{display}%</Text>
      </View>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    color: '#54219D',
  },
});
