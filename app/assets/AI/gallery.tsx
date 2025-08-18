import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

const GalleryIcon = ({ color = '#979C9E', size = 16, strokeWidth = 2.0751 }) => {
  return (
    <View style={styles.container}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 35 35"
        fill="none"
      >
        <Path
          d="M13.2639 14.7447C14.7919 14.7447 16.0307 13.5059 16.0307 11.9779C16.0307 10.4498 14.7919 9.21106 13.2639 9.21106C11.7358 9.21106 10.4971 10.4498 10.4971 11.9779C10.4971 13.5059 11.7358 14.7447 13.2639 14.7447Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.7975 3.67749H13.2639C6.34688 3.67749 3.58008 6.4443 3.58008 13.3613V21.6617C3.58008 28.5787 6.34688 31.3455 13.2639 31.3455H21.5643C28.4813 31.3455 31.2481 28.5787 31.2481 21.6617V14.7447"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M22.6021 7.82764H30.2108"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d="M26.4062 11.632V4.02332"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d="M4.50684 27.1262L11.327 22.5471C12.4199 21.8139 13.997 21.8969 14.9792 22.7408L15.4357 23.142C16.5148 24.0688 18.2579 24.0688 19.3369 23.142L25.0919 18.2032C26.1709 17.2763 27.914 17.2763 28.9931 18.2032L31.248 20.14"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
});

export { GalleryIcon };
