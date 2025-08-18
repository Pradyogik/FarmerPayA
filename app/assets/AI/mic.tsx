import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

const LockIcon = ({ color = 'white', size = 33 }) => {
  return (
    <View style={styles.container}>
      <Svg
        width={size}
        height={(size * 34) / 33} // Maintain aspect ratio
        viewBox="0 0 33 34"
        fill="none"
      >
        <Path
          d="M16.5 21.3125C19.5388 21.3125 22 18.8513 22 15.8125V8.25C22 5.21125 19.5388 2.75 16.5 2.75C13.4612 2.75 11 5.21125 11 8.25V15.8125C11 18.8513 13.4612 21.3125 16.5 21.3125Z"
          stroke={color}
          strokeWidth={2.0625}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.98096 13.2688V15.6063C5.98096 21.4088 10.6972 26.1251 16.4997 26.1251C22.3022 26.1251 27.0185 21.4088 27.0185 15.6063V13.2688"
          stroke={color}
          strokeWidth={2.0625}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.5889 8.84129C15.8264 8.38754 17.1739 8.38754 18.4114 8.84129"
          stroke={color}
          strokeWidth={2.0625}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.3999 11.7563C16.1287 11.5638 16.8849 11.5638 17.6137 11.7563"
          stroke={color}
          strokeWidth={2.0625}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.5 26.125V32.5417"
          stroke={color}
          strokeWidth={2.0625}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { LockIcon };
