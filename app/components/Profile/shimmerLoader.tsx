import React, { useEffect, useRef } from 'react';
import { Animated, DimensionValue, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native'; // 👈 import this

interface ShimmerProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
}

const ShimmerLoader: React.FC<ShimmerProps> = ({
  width = '100%',
  height = 10,
  borderRadius = 2,
  backgroundColor = '#97EAD2',
}) => {
  const translateX = useRef(new Animated.Value(-200)).current;
  const isFocused = useIsFocused(); // 👈 detect screen focus

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isFocused) {
      animation = Animated.loop(
        Animated.timing(translateX, {
          toValue: 200,
          duration: 1500,
          useNativeDriver: true,
        }),
      );
      animation.start();
    }

    return () => {
      translateX.setValue(-200); // Reset when unmount or blur
      animation?.stop(); // Stop animation if not focused
    };
  }, [isFocused]);

  return (
    <View>
      <LinearGradient
        colors={['#97EAD2', '#97EAD2', 'rgba(151, 234, 210, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.container,
          { width, height, borderRadius, backgroundColor },
        ]}
      >
        <Animated.View
          style={[
            styles.shimmerOverlay,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={['#9EF5D2', '#B1FFE3', '#9EF5D2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, { height, borderRadius }]}
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9EF5D2',
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: 200,
    opacity: 0.5,
  },
});

export default ShimmerLoader;
