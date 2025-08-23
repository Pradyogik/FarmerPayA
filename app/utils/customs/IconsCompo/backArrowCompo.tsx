import React from "react";
import Svg, { Path } from "react-native-svg";

interface ArrowCircleIconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  lineColor?: string;
}

const ArrowCircleBackIcon: React.FC<ArrowCircleIconProps> = ({
  size = 32,
  fillColor = "#F2F2F2",
  strokeColor = "#5F25B0",
  lineColor = "#5F25B0",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 0.5C24.5604 0.5 31.5 7.43959 31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.5 24.5604 0.5 16C0.5 7.43959 7.43959 0.5 16 0.5Z"
        fill={fillColor}
      />
      <Path
        d="M16 0.5C24.5604 0.5 31.5 7.43959 31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.5 24.5604 0.5 16C0.5 7.43959 7.43959 0.5 16 0.5Z"
        stroke={strokeColor}
      />
      <Path
        d="M20.6666 16H11.3333"
        stroke={lineColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.9999 20.6668L11.3333 16.0002L15.9999 11.3335"
        stroke={lineColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowCircleBackIcon;
