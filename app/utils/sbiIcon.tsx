import { View } from 'react-native';
import Svg, { Defs, Image, Pattern, Rect } from 'react-native-svg';
const SbiIcon = () => {
  return (
    <View>
      <Svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <Rect width="32" height="32" rx="16" fill="url(#pattern0_1669_16541)" />
        <Defs>
          <Pattern
            id="pattern0_1669_16541"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_1669_16541"
              transform="scale(0.00277778)"
            />
          </Pattern>
          <Image
            id="image0_1669_16541"
            width="360"
            height="360"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,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"
          />
        </Defs>
      </Svg>
    </View>
  );
};
export default SbiIcon;