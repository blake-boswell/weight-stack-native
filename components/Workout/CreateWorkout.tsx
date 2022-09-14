import {
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
import { RootStackParamList } from '../../types/Navigator/RootNavigator';
import Button from '../UI/Button/Button';
import Input from '../UI/TextInput';

const CreateWorkout = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'CreateWorkout'>) => {
  const [workoutName, setWorkoutName] = useState('Quads and Hamstrings');

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
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
            navigation.navigate('CreateWorkoutFromTemplate');
          }}
        >
          <Text style={styles.linkText}>Use a previous routine?</Text>
        </Pressable>
        <Button variant="info" style={styles.createButton}>
          Create
        </Button>
      </KeyboardAvoidingView>
    </View>
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
  },
});

export default CreateWorkout;
