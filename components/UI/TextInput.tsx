import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
} from 'react-native';
import { Colors, Spacing, Typography } from '../../styles/core';

export interface InputProps extends TextInputProps {}

const Input = ({ style, onFocus, onBlur, ...rest }: InputProps) => {
  const [active, setActive] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setActive(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setActive(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <TextInput
      style={StyleSheet.compose<TextStyle>(
        {
          ...styles.input,
          borderColor: active ? Colors.inputBorderActive : Colors.inputBorder,
        },
        style,
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: Spacing.xxs,
    width: '100%',
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default Input;
