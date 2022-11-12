import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../../styles/core';
import { Gap } from '../../Layout/Gap';
import Heading from '../../UI/Typography/Heading';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const RoutineHeader = ({
  navigation,
  route,
  options,
}: NativeStackHeaderProps) => {
  const handleAdd = () => {
    navigation.navigate('CreateRoutine');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        <Heading size={3}>Routines</Heading>
      </View>
      <Gap size={Spacing.sm} horizontal style={styles.right}>
        <Pressable>
          <Feather name="search" size={24} />
        </Pressable>
        <Pressable onPress={handleAdd}>
          <Feather name="plus" size={28} />
        </Pressable>
      </Gap>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default RoutineHeader;
