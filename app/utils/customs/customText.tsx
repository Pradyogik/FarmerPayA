import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import Fonts from '../constants/fonts';

// Extract keys from Fonts object
type FontFamilyKeys = keyof typeof Fonts;
type FontWeightKeys<F extends FontFamilyKeys> = keyof (typeof Fonts)[F];

interface CustomTextProps extends RNTextProps {
  fontFamily?: FontFamilyKeys;
  weight?: FontWeightKeys<FontFamilyKeys>;
  size?: number;
  color?: string;
  letterSpacing?: number;
  lineHeight?: number;
  style?: TextStyle | TextStyle[];
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  fontFamily = 'Inter',
  weight = 400,
  size = 16,
  color = '#000',
  letterSpacing = 0,
  lineHeight,
  style,
  ...rest
}) => {
  // Pick the registered font name from Fonts.ts
  const resolvedFont =
    Fonts[fontFamily]?.[weight as keyof (typeof Fonts)[typeof fontFamily]] ??
    Fonts.Inter[400];

  return (
    <RNText
      {...rest}
      style={[
        {
          fontFamily: resolvedFont,
          fontSize:size, // 🔹 responsive font size
          color,
          letterSpacing,
          lineHeight: lineHeight,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

export default CustomText;
