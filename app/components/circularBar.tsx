import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  // Accept both prop names – use whichever is provided
  target?: number;
  progress?: number;
  size?: number;
  strokeWidth?: number;
  tintColor?: string;
  trackColor?: string;
  duration?: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<Props> = ({
  target,
  progress,
  size = 72,
  strokeWidth = 8,
  tintColor = '#54219D',
  trackColor = '#E5E7EB',
  duration = 900,
}) => {
  // Prefer `target`, fallback to `progress`, then 0
  const goalRaw = target ?? progress ?? 0;
  const goal = Math.max(0, Math.min(100, Number.isFinite(+goalRaw) ? +goalRaw : 0));

  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const anim = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState<number>(Math.round(goal));

  useEffect(() => {
    Animated.timing(anim, {
      toValue: goal,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // strokeDashoffset can't use native driver
    }).start();
  }, [goal, duration, anim]);

  useEffect(() => {
    const id = anim.addListener(({ value }) => {
      // guard against undefined
      setDisplay(Math.round(Number.isFinite(value) ? (value as number) : goal));
    });
    return () => anim.removeListener(id);
  }, [anim, goal]);

  const dashOffset = anim.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const label = Number.isFinite(display) ? display : Math.round(goal);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
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

      <View style={styles.center}>
        <Text style={styles.percent}>{label}%</Text>
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
