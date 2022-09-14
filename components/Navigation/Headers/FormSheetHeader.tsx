import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '../../../styles/core';

const FormSheetHeader = ({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) => (
  <View style={styles.container}>
    <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
      <Feather name="x" size={24} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  closeButton: {
    marginLeft: 'auto',
    marginTop: Spacing.md,
    marginRight: Spacing.md,
  },
});

export default FormSheetHeader;
