import * as Colors from './colors';

const baseFontSize = 16;

export const text = {
  sm: {
    fontSize: baseFontSize * 0.75, // 12
  },
  secondary: {
    fontSize: baseFontSize * 0.875, // 14
  },
  base: {
    fontSize: baseFontSize, // 16
  },
  md: {
    fontSize: baseFontSize * 1.25, // 20
  },
  lg: {
    fontSize: baseFontSize * 1.5, // 24
  },
  xl: {
    fontSize: baseFontSize * 1.75, // 28
  },
  xxl: {
    fontSize: baseFontSize * 2, // 32
  },
  xxxl: {
    fontSize: baseFontSize * 3, // 48
  },
  monster: {
    fontSize: baseFontSize * 4, // 64
  },
};

export const Typography = {
  headline: {
    ...text.xl,
  },
  sectionTitle: {
    ...text.lg,
  },
  body: {
    ...text.base,
  },
  secondary: {
    ...text.secondary,
  },
  small: {
    ...text.sm,
  },
  link: {
    color: Colors.blue,
  },
};
