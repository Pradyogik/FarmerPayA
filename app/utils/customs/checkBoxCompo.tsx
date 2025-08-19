import { TouchableOpacity, View } from 'react-native';
import CustomText from './customText';
import React from 'react';
import CorrectIcon from '../../assets/images/Icons/correctIcon.svg';
interface radioProps {
  content?: String;
  onPress?: () => void;
  active?: boolean;
}
const CustomCheckBox: React.FC<radioProps> = ({ content, onPress, active }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
      }}
    >
     {active?<CorrectIcon/>: <View
        style={{
          borderRadius: 6,
          height: 24,
          width: 24,
          borderWidth:  1,
          borderColor: '#49FAC7',
          padding: 6,
        }}
      />}
      <CustomText size={14} lineHeight={21}>
        {content}
      </CustomText>
    </TouchableOpacity>
  );
};
export default CustomCheckBox;
