import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing } from '../../../styles/core';

export interface ButtonProps extends PressableProps {
  variant?: 'success' | 'danger' | 'info' | 'warning' | 'primary' | 'accent';
}

const Button = ({ variant, children, style, ...rest }: ButtonProps) => {
  return (
    <Pressable
      style={StyleSheet.flatten([
        style,
        StyleSheet.flatten<ViewStyle>([
          styles.button,
          {
            backgroundColor:
              variant === 'success'
                ? Colors.success
                : variant === 'danger'
                ? Colors.danger
                : variant === 'info'
                ? Colors.info
                : variant === 'warning'
                ? Colors.warning
                : variant === 'primary'
                ? Colors.primary
                : variant === 'accent'
                ? Colors.accent
                : 'none',
          },
        ]),
      ])}
      {...rest}
    >
      <Text
        style={StyleSheet.flatten<TextStyle>([
          styles.text,
          {
            color:
              variant === 'success' ||
              variant === 'danger' ||
              variant === 'accent'
                ? Colors.text
                : Colors.white,
          },
        ])}
      >
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
