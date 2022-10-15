import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  PressableStateCallbackType,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../styles/core';

export interface PillFilterProps {
  name: string;
  activeFilter: string | null;
  onTap: (e: GestureResponderEvent) => void;
  style:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
}

const PillFilter = ({ name, activeFilter, onTap, style }: PillFilterProps) => {
  const [xStartPos, setXStartPos] = useState(0);
  const [isActive, setIsActive] = useState(activeFilter === name);
  const activeFilterXPos = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.spring(activeFilterXPos, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive]);

  // useEffect(() => {
  //   if (activeFilter && activeFilter !== name) {
  //     Animated.timing(filterOpacity, {
  //       toValue: 0,
  //       delay: 50,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, [activeFilter]);

  const assignStart = (e: LayoutChangeEvent) => {
    // Subtract the left padding spacer of 16
    setXStartPos(e.nativeEvent.layout.x - 16);
    console.log('assigning start for ', name, ' at ', e.nativeEvent.layout.x);
  };

  const handleTap = (e: GestureResponderEvent) => {
    console.log('It was a tap');
    onTap(e);
    setIsActive(true);
  };

  const handleClear = (e: GestureResponderEvent) => {
    console.log('It was a clear');
    Animated.spring(activeFilterXPos, {
      toValue: 0,
      velocity: 10,
      useNativeDriver: true,
    }).start(() => {
      setIsActive(false);
      onTap(e);
    });
  };

  console.log(name, isActive, activeFilter);

  if (isActive) {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX: activeFilterXPos.interpolate({
                inputRange: [0, 1],
                outputRange: [xStartPos, 0],
              }),
            },
          ],
        }}
      >
        <Pressable
          onPress={handleClear}
          style={
            typeof style === 'object'
              ? { ...styles.pill, ...style, backgroundColor: 'red' }
              : styles.pill
          }
        >
          <Text>{name}</Text>
        </Pressable>
      </Animated.View>
    );
  } else if (!activeFilter) {
    return (
      <Pressable
        onPress={handleTap}
        style={
          typeof style === 'object'
            ? { ...styles.pill, ...style, backgroundColor: 'green' }
            : styles.pill
        }
        onLayout={assignStart}
      >
        <Text>{name}</Text>
      </Pressable>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1,
    borderColor: Colors.textMuted.color,
    color: Colors.textMuted,
    borderRadius: 50,
    // marginRight: Spacing.xxs,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  pill__active: {
    borderColor: Colors.accent,
  },
  spacer: {
    width: 16,
  },
});

export default PillFilter;
