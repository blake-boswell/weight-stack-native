import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { darkGray, textMuted } from '../../../styles/core/colors';
import { text } from '../../../styles/core/typography';

export interface HeadingProps extends TextProps {
  size: 1 | 2 | 3 | 4 | 5;
}

const Heading = ({ children, size, style, ...props }: HeadingProps) => (
  <Text
    style={[
      size === 1
        ? { ...text.xxxl }
        : size === 2
        ? { ...text.xxl }
        : size === 3
        ? { ...text.xl, color: darkGray }
        : size === 4
        ? { ...text.lg, ...textMuted }
        : size === 5
        ? { ...text.base, ...textMuted }
        : undefined,
      style,
    ]}
    {...props}
  >
    {children}
  </Text>
);

export default Heading;
