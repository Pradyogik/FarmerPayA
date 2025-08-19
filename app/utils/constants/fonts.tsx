// app/utils/customs/Fonts.ts
const Fonts = {
  Inter: {
    400: 'Inter-Regular',
    500: 'Inter-Medium',
    600: 'Inter-SemiBold',
    700: 'Inter-Bold',
  },
} as const;
export const FontSizes = {
  headings: {
    h1: 80,
    h3: 56,
    h4: 48,
    h5: 40,
    h6: 32,
    h7: 24,
  },
  body: {
    b7: 20,
    b6: 18,
    b5: 16,
    b4: 14,
    b3: 12,
    b2: 10,
    b1: 8,
  }
};

export default Fonts;
