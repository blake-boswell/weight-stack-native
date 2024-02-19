import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Text,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Dumbell from '../../../svg/Dumbell';
import { Colors, Spacing } from '../../../../styles/core';

interface ActionButtonProps {
  size?: number;
  style?: any;
  isFocused?: boolean;
  color?: string;
  onPress?: (
    e: NativeSyntheticEvent<NativeTouchEvent>,
    isMenuOpen: boolean,
  ) => void;
  onCreateWorkoutPress: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const ActionButton = ({
  size = 16,
  style,
  isFocused = false,
  color = Colors.text,
  onPress,
  onCreateWorkoutPress,
}: ActionButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const createWorkoutPositionAnim = useRef(
    new Animated.ValueXY({ x: 0, y: -8 }),
  ).current;
  const createProgramPositionAnim = useRef(
    new Animated.ValueXY({ x: 0, y: -8 }),
  ).current;

  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: isMenuOpen ? 1 : 0,
      speed: 15,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: isMenuOpen ? 1 : 0,
      duration: isMenuOpen ? 300 : 100,
      useNativeDriver: true,
    }).start();

    Animated.spring(createWorkoutPositionAnim, {
      toValue: isMenuOpen ? { x: -96, y: -96 } : { x: 0, y: -8 },
      speed: 15,
      useNativeDriver: true,
    }).start();

    Animated.spring(createProgramPositionAnim, {
      toValue: isMenuOpen ? { x: 96, y: -96 } : { x: 0, y: -8 },
      speed: 15,
      useNativeDriver: true,
    }).start();
  }, [isMenuOpen]);

  const handlePress = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    console.log('press');

    if (onPress) {
      onPress(e, !isMenuOpen);
    }
    setIsMenuOpen(prev => !prev);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-45deg'],
  });

  const handleCreateWorkoutPress = (
    e: NativeSyntheticEvent<NativeTouchEvent>,
  ) => {
    onCreateWorkoutPress(e);
    setIsMenuOpen(false);
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      <Animated.View
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          opacity: fadeAnim,
          transform: createWorkoutPositionAnim.getTranslateTransform(),
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel="add menu"
          onPress={handleCreateWorkoutPress}
          style={{ ...styles.button }}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', padding: Spacing.xs }}>
              <Dumbell size={size - 16} fill={Colors.accent} />
            </View>
          </View>
        </Pressable>
        <Text style={styles.buttonText}>Create workout</Text>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          opacity: fadeAnim,
          transform: createProgramPositionAnim.getTranslateTransform(),
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel="add menu"
          onPress={() => console.log('small press')}
          style={{ ...styles.button }}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', padding: Spacing.xs }}>
              <Feather name="calendar" size={size - 16} color={Colors.accent} />
            </View>
          </View>
        </Pressable>
        <Text style={styles.buttonText}>Create program</Text>
      </Animated.View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel="add menu"
        onPress={handlePress}
        style={{
          height: size,
          width: size,
          ...styles.button,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Animated.View
            style={{
              alignItems: 'center',
              transform: [{ rotate: spin }],
            }}
          >
            <Feather name="plus" size={size - 16} color={color} />
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: Colors.backgroundLight,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default ActionButton;
