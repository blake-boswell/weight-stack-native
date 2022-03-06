import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Text,
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
// import Dumbell from '../../../images/dumbell.svg';
import Dumbell from '../../svg/Dumbell';
import { Colors } from '../../../styles/core';

interface ActionButtonProps {
  size?: number;
  style?: any;
  isFocused?: boolean;
  color?: string;
}

const ActionButton = ({
  size = 16,
  style,
  isFocused = false,
  color = Colors.text,
}: ActionButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.ValueXY({ x: 0, y: -8 })).current;

  const onPress = () => {
    console.log('press');
    Animated.spring(rotateAnim, {
      toValue: isMenuOpen ? 0 : 1,
      speed: 15,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: isMenuOpen ? 0 : 1,
      duration: isMenuOpen ? 100 : 300,
      useNativeDriver: true,
    }).start();

    Animated.spring(positionAnim, {
      toValue: isMenuOpen ? { x: 0, y: -8 } : { x: -96, y: -96 },
      speed: 15,
      useNativeDriver: true,
    }).start();

    setIsMenuOpen(prev => !prev);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-45deg'],
  });

  return (
    <View style={{ ...styles.container, ...style }}>
      <Animated.View
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          opacity: fadeAnim,
          transform: positionAnim.getTranslateTransform(),
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
            <View style={{ alignItems: 'center' }}>
              <Dumbell size={48} fill={Colors.accent} />
            </View>
          </View>
        </Pressable>
        <Text>Create workout</Text>
      </Animated.View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel="add menu"
        onPress={onPress}
        style={{
          height: size,
          width: size,
          ...styles.button,
          ...styles.moveUp,
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
  moveUp: {
    position: 'absolute',
    top: -8,
  },
});

export default ActionButton;
