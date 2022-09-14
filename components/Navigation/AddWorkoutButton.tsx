import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../styles/core';
import ListItem from '../UI/List/ListItem';
import HorizontalSeparator from '../UI/List/HorizontalSeparator';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';

export interface AddWorkoutButtonProps extends PressableProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const AddWorkoutButton = ({
  navigation,
  onPress,
  ...rest
}: AddWorkoutButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateWorkoutFromTemplatePress = () => {
    closeModal();
    navigation.navigate('CreateWorkoutFromTemplate');
  };

  const handleCreateNewWorkoutPress = () => {
    closeModal();
    navigation.navigate('CreateWorkout');
  };

  return (
    <View>
      <Pressable
        style={styles.button}
        onPress={e => {
          setIsModalOpen(true);
          if (onPress) onPress(e);
        }}
        {...rest}
      >
        <Feather size={28} name="plus" style={styles.icon} />
      </Pressable>
      <View style={modalStyles.centered}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={closeModal}
        >
          <View style={modalStyles.centered}>
            <View style={modalStyles.container}>
              <View style={modalStyles.control}>
                <Pressable onPress={closeModal}>
                  <Feather name="x" size={24} color={Colors.red} />
                </Pressable>
              </View>
              <View style={modalStyles.modalBody}>
                <ListItem onPress={handleCreateWorkoutFromTemplatePress}>
                  <Text style={modalStyles.optionText}>From Template</Text>
                </ListItem>
                <HorizontalSeparator />
                <ListItem onPress={handleCreateNewWorkoutPress}>
                  <Text style={modalStyles.optionText}>Create New</Text>
                </ListItem>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    color: Colors.blue,
  },
  icon: {
    color: Colors.blue,
  },
});

const modalStyles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    // padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBody: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  control: {
    alignSelf: 'flex-end',
    marginTop: Spacing.sm,
    marginHorizontal: Spacing.sm,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  optionText: {
    ...Typography.text.md,
    color: Colors.blue,
    // textAlign: 'center',
  },
  text: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AddWorkoutButton;
