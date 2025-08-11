import { TouchableOpacity, View } from 'react-native';
import CustomText from './customText';
import React from 'react';

interface radioProps {
  content?: String;
  onPress?: () => void;
  active?: boolean;
}
const CustomRadio: React.FC<radioProps> = ({ content, onPress, active }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          borderRadius: 24,
          height: 24,
          width: 24,
          borderWidth: active ? 8 : 1,
          borderColor: '#49FAC7',
          padding: 6,
        }}
      />
      <CustomText size={14} lineHeight={21}>
        {content}
      </CustomText>
    </TouchableOpacity>
  );
};
export default CustomRadio;
