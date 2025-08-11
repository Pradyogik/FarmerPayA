import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, DimensionValue } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  width?:DimensionValue;
}

const LargeWhiteButton: React.FC<ButtonProps> = ({ title, onPress ,width="90%"}) => {
  return (
    <TouchableOpacity style={[styles.button,{width:width}]} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderColor: '#6929C4',
    borderRadius: 48,
    borderWidth: 2,
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  text: {
    color: '#6929C4',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LargeWhiteButton;
