import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Colors, Spacing } from '../../../styles/core';

const HorizontalSeparator = (props: ViewProps) => {
  return <View style={StyleSheet.flatten([styles.separator, props.style])} />;
};

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    height: 1,
    marginVertical: Spacing.xxxs,
    marginHorizontal: Spacing.lg,
  },
});

export default HorizontalSeparator;
