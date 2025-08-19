// utils/BackArrow.tsx
import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import ArrowBack from '../assets/images/back-arrow.svg'; // adjust the path if needed
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type BackArrowProps = {
  style?: StyleProp<ViewStyle>;
};

// Use "any" if you don’t have a defined RootStackParamList yet
const BackArrow = ({ style }: BackArrowProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Pressable onPress={() => navigation.goBack()} style={style}>
      <ArrowBack width={24} height={24} />
    </Pressable>
  );
};

export default BackArrow;
