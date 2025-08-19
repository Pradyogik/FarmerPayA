// app/assets/AI/like.tsx
import React from 'react';
import { Svg, Path } from 'react-native-svg';

type Props = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

const LikeIcon: React.FC<Props> = ({
  color = '#1F1F1F',
  size = 28,
  strokeWidth = 1.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Path
      d="M8.72656 21.4084L12.3432 24.2084C12.8099 24.675 13.8599 24.9084 14.5599 24.9084H18.9932C20.3932 24.9084 21.9099 23.8584 22.2599 22.4584L25.0599 13.9417C25.6432 12.3084 24.5932 10.9084 22.8432 10.9084H18.1766C17.4766 10.9084 16.8932 10.325 17.0099 9.50838L17.5932 5.77504C17.8266 4.72504 17.1266 3.55838 16.0766 3.20838C15.1432 2.85838 13.9766 3.32504 13.5099 4.02504L8.72656 11.1417"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeMiterlimit={10}
    />
    <Path
      d="M2.77686 21.4083V9.97497C2.77686 8.34163 3.47686 7.7583 5.11019 7.7583H6.27686C7.91019 7.7583 8.61019 8.34163 8.61019 9.97497V21.4083C8.61019 23.0416 7.91019 23.625 6.27686 23.625H5.11019C3.47686 23.625 2.77686 23.0416 2.77686 21.4083Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LikeIcon;
export { LikeIcon };
