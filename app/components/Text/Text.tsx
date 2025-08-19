import React from 'react';
import {StyleSheet} from 'react-native';
import TextComp from './TextComp';
import Fonts from './Fonts';

export default function Text({
  style,
  children,
  fontFamiliy = 'Inter',
  fontWeight = '400',
}) {
  return (
    <TextComp style={[style, {fontFamily: Fonts[fontFamiliy][fontWeight]}]}>
      {children}
    </TextComp>
  );
}
