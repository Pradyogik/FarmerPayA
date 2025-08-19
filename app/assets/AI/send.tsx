// app/assets/AI/send.tsx
import React from 'react';
import { Svg, Path, G } from 'react-native-svg';

type Props = {
  color?: string;
  size?: number;
  rotate?: number; // degrees (positive = clockwise)
};

const SendIcon: React.FC<Props> = ({ color = '#FFFFFF', size = 20, rotate = 0 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G transform={`rotate(${rotate} 10 10)`}>
        <Path
          d="M14.1401 0.959997L5.11012 3.96C-0.959883 5.99 -0.959883 9.3 5.11012 11.32L7.79012 12.21L8.68012 14.89C10.7001 20.96 14.0201 20.96 16.0401 14.89L19.0501 5.87C20.3901 1.82 18.1901 -0.390003 14.1401 0.959997ZM14.4601 6.34L10.6601 10.16C10.5101 10.31 10.3201 10.38 10.1301 10.38C9.94012 10.38 9.75012 10.31 9.60012 10.16C9.31012 9.87 9.31012 9.39 9.60012 9.1L13.4001 5.28C13.6901 4.99 14.1701 4.99 14.4601 5.28C14.7501 5.57 14.7501 6.05 14.4601 6.34Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default SendIcon;
export { SendIcon };
