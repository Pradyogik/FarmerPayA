import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function TextComp({style, children}) {
  return <Text style={style}>{children}</Text>;
}
