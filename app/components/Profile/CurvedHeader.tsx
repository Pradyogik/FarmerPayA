import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const HeaderCurve = () => {
  return (
    <Svg
      height="60"
      width={width}
      viewBox={`0 0 ${width} 60`}
      style={{ position: 'absolute', bottom: -1 }}
    >
      <Path
        d={`M0,0 Q${width / 2},60 ${width},0 L${width},60 L0,60 Z`}
        fill="#5F25B0"
      />
    </Svg>
  );
};

export default HeaderCurve;
