import React, { useRef, useState } from 'react';
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
  variant?:
    | 'success'
    | 'danger'
    | 'info'
    | 'warning'
    | 'primary'
    | 'accent'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-info'
    | 'outline-warning'
    | 'outline-primary'
    | 'outline-accent';
  round?: boolean;
}

const Button = ({
  variant,
  children,
  style,
  onPressIn,
  onPressOut,
  round = false,
  ...rest
}: ButtonProps) => {
  const isPressed = useRef(false);

  return (
    <Pressable
      onPressIn={e => {
        if (onPressIn) {
          onPressIn(e);
        }
        isPressed.current = true;
      }}
      onPressOut={e => {
        if (onPressOut) {
          onPressOut(e);
        }
        isPressed.current = false;
      }}
      style={StyleSheet.compose(
        StyleSheet.compose<ViewStyle>(
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
                : 'transparent',
            borderColor:
              variant === 'success' || variant === 'outline-success'
                ? Colors.success
                : variant === 'danger' || variant === 'outline-danger'
                ? Colors.danger
                : variant === 'info' || variant === 'outline-info'
                ? Colors.info
                : variant === 'warning' || variant === 'outline-warning'
                ? Colors.warning
                : variant === 'primary' || variant === 'outline-primary'
                ? Colors.primary
                : variant === 'accent' || variant === 'outline-accent'
                ? Colors.accent
                : 'transparent',
            borderWidth:
              variant === 'outline-success' ||
              variant === 'outline-danger' ||
              variant === 'outline-info' ||
              variant === 'outline-warning' ||
              variant === 'outline-primary' ||
              variant === 'outline-accent'
                ? 1
                : undefined,
            borderRadius: round ? 50 : 4,
          },
        ),
        typeof style === 'function'
          ? style({ pressed: isPressed.current })
          : style,
      )}
      {...rest}
    >
      <Text
        style={StyleSheet.compose<TextStyle>(
          styles.text,
          {
            color:
              variant === 'outline-success'
                ? Colors.success
                : variant === 'outline-danger'
                ? Colors.danger
                : variant === 'outline-info'
                ? Colors.info
                : variant === 'outline-warning'
                ? Colors.warning
                : variant === 'outline-primary'
                ? Colors.primary
                : variant === 'outline-accent'
                ? Colors.accent
                : variant === 'success' ||
                  variant === 'danger' ||
                  variant === 'accent'
                ? Colors.text
                : Colors.white,
          },
        )}
      >
        {typeof children === 'function'
          ? children({ pressed: isPressed.current })
          : children}
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
