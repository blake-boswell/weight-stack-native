import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from '../../../UI/Typography/Heading';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export interface EditWorkoutHeaderProps extends NativeStackHeaderProps {
  title: string;
}

const EditWorkoutHeader = ({
  title,
  navigation,
  route,
  options,
}: EditWorkoutHeaderProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        <Heading size={3}>{title}</Heading>
      </View>
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

export default EditWorkoutHeader;
