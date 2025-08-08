import { StyleSheet, TextStyle } from 'react-native';

interface TextStyles {
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  body: TextStyle;
  bodyBold: TextStyle;
  small: TextStyle;
  smallBold: TextStyle;
  link: TextStyle;
  error: TextStyle;
  title: TextStyle;
  subtitle?: TextStyle;
}

const textStyles = StyleSheet.create<TextStyles>({
  heading1: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Inter-SemiBold', // or just 'Inter' depending on how fonts are linked
    fontWeight: '600', // optional if font file is specific weight
    lineHeight: 22, // 100% of fontSize
    letterSpacing: 0, // default is 0
    textAlignVertical: 'center', // only supported on Android
  },
  heading2: {
    fontFamily: 'Inter-SemiBold', // Must be correctly linked
    fontWeight: '600', // Optional if font file handles weight
    fontSize: 30.19,
    lineHeight: 30.19 * 1.17, // ~35.32
    letterSpacing: -0.04 * 30.19, // ~-1.2076
    color: '#FFAB00',
    marginVertical: 2,
  },

  heading3: {
    fontFamily: 'Inter-Light', // depends on how font is loaded
    fontWeight: '300', // optional if font file handles it
    fontSize: 16,
    lineHeight: 18.72, // 16 * 1.17
    letterSpacing: -0.64, // -4% of 16
    color: 'white',
  },
  body: {
    fontSize: 16,
    color: '#444',
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  small: {
    fontSize: 12,
    color: '#666',
  },
  smallBold: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  link: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  error: {
    fontSize: 14,
    color: '#e63946',
  },
  title: {
    fontFamily: 'Inter-Bold', 
    fontSize: 16,
    lineHeight: 16, // 100% of 20px
    letterSpacing: 0, // 0% = 0px
    color: '#1F077A',
    marginVertical: 8,
    marginBottom: 12,
  },
});

export default textStyles;
