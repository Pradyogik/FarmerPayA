import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface MessageOptionProps {
  label: string;
  onPress: () => void;
}

const MessageOption: React.FC<MessageOptionProps> = ({ label, onPress}) => {
  return (
    <LinearGradient
      colors={['#FF0000', '#FFA500']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 2 }}
      style={[styles.gradientBorder]}
    >
      <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.optionText} numberOfLines={2}>{label}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 0.8,
    borderRadius: 24,
    marginHorizontal: 4,
    width:'auto',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FF0000',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
  },
  optionText: {
    color: '#333333',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default MessageOption;
