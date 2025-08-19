// app/assets/AI/dislike.tsx
import React from 'react';
import { Svg, Path } from 'react-native-svg';

type Props = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

const DislikeIcon: React.FC<Props> = ({
  color = '#1F1F1F',
  size = 28,
  strokeWidth = 1.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Path
      d="M19.2732 6.59167L15.6565 3.79167C15.1898 3.32501 14.1399 3.09167 13.4399 3.09167H9.00652C7.60652 3.09167 6.08985 4.14167 5.73985 5.54167L2.93985 14.0583C2.35652 15.6917 3.40652 17.0917 5.15652 17.0917H9.82318C10.5232 17.0917 11.1065 17.675 10.9899 18.4917L10.4065 22.225C10.1732 23.275 10.8732 24.4417 11.9232 24.7917C12.8565 25.1417 14.0232 24.675 14.4898 23.975L19.2732 16.8583"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeMiterlimit={10}
    />
    <Path
      d="M25.2235 6.59167V18.025C25.2235 19.6583 24.5235 20.2417 22.8901 20.2417H21.7235C20.0901 20.2417 19.3901 19.6583 19.3901 18.025V6.59167C19.3901 4.95833 20.0901 4.375 21.7235 4.375H22.8901C24.5235 4.375 25.2235 4.95833 25.2235 6.59167Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DislikeIcon;
export { DislikeIcon };
