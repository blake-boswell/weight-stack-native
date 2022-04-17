import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';

const CreateWorkout = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate({ key: 'Main' });
  };

  return (
    <View>
      <Text>Create Workout</Text>
      <Button title="Go Home" onPress={handlePress}>
        Go Home
      </Button>
    </View>
  );
};

export default CreateWorkout;
