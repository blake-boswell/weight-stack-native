import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { Spacing, Typography } from '../../../styles/core';

export interface ListItemProps extends PressableProps {}

const ListItem = ({ children, onPress, style, ...rest }: ListItemProps) => {
  return (
    <Pressable
      style={style ? StyleSheet.flatten([styles.row, style]) : styles.row}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
});

export default ListItem;
