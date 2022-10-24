import {
  CommonActions,
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Spacing, Typography } from '../../styles/core';
import { WorkoutStackParamList } from '../../types/Navigator/RootNavigator';
import Button from '../UI/Button/Button';
import Input from '../UI/TextInput';

const CreateWorkout = ({
  navigation,
  route,
}: NativeStackScreenProps<
  WorkoutStackParamList,
  'CreateWorkout',
  'WorkoutNavigator' | 'TabNav'
>) => {
  const [workoutName, setWorkoutName] = useState('New workout');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.heading}>Name your workout.</Text>
      <Input
        style={styles.input}
        value={workoutName}
        onChangeText={setWorkoutName}
        autoFocus
        selectTextOnFocus
      />
      <Pressable
        onPress={() => {
          const tabNav = navigation.getParent('TabNav');
          if (tabNav) {
            navigation.goBack();
            setTimeout(() => tabNav.navigate('Routines'), 100);
          }
        }}
      >
        <Text style={styles.linkText}>Use a previous routine?</Text>
      </Pressable>
      <Button variant="info" style={styles.createButton}>
        Create
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: Spacing.xl,
    fontSize: Typography.text.md.fontSize,
    marginHorizontal: Spacing.lg,
  },
  heading: {
    ...Typography.text.md,
    textAlign: 'center',
  },
  input: {
    ...Typography.text.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  linkText: {
    ...Typography.Typography.link,
    textAlign: 'center',
  },
  createButton: {
    marginVertical: Spacing.xl,
    width: '100%',
  },
});

export default CreateWorkout;
