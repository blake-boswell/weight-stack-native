import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../../../styles/core';

export interface PillFilterBadgeProps {
  name: string;
  activeFilter: string | null;
  onTap: (e: GestureResponderEvent) => void;
  startOffset?: number;
  style:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
}

const PillFilterBadge = ({
  name,
  activeFilter,
  onTap,
  startOffset = 0,
  style,
}: PillFilterBadgeProps) => {
  const [xStartPos, setXStartPos] = useState(0);
  const [isActive, setIsActive] = useState(activeFilter === name);
  const [isFaded, setIsFaded] = useState(false);
  const activeFilterXPos = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (name === activeFilter) {
      Animated.spring(activeFilterXPos, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else if (isActive) {
      Animated.spring(activeFilterXPos, {
        toValue: 0,
        speed: 15,
        bounciness: 4,
        useNativeDriver: true,
      }).start(() => {
        setIsActive(false);
      });
    }
  }, [activeFilter, isActive]);

  useEffect(() => {
    if (activeFilter && !isActive) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() => setIsFaded(true));
    } else if (!isActive) {
      setIsFaded(false);
      Animated.timing(opacity, {
        toValue: 1,
        delay: 50,
        useNativeDriver: true,
      }).start();
    }
  }, [activeFilter, isActive]);

  const assignStart = (e: LayoutChangeEvent) => {
    setXStartPos(e.nativeEvent.layout.x);
  };

  const handleTap = (e: GestureResponderEvent) => {
    onTap(e);
    setIsActive(true);
  };

  const handleClear = (e: GestureResponderEvent) => {
    onTap(e);
  };

  if (isActive) {
    return (
      <>
        <View
          style={
            typeof style === 'object'
              ? { ...styles.pill, ...style, opacity: 0 }
              : styles.pill
          }
        >
          <Text>{name}</Text>
        </View>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: [
              {
                translateX: activeFilterXPos.interpolate({
                  inputRange: [0, 1],
                  outputRange: [xStartPos, startOffset],
                }),
              },
            ],
          }}
        >
          <Pressable
            onPress={handleClear}
            style={
              typeof style === 'object'
                ? { ...styles.pill, ...style }
                : styles.pill
            }
          >
            <Text>{name}</Text>
          </Pressable>
        </Animated.View>
      </>
    );
  } else {
    return (
      <Animated.View style={{ opacity: opacity }} onLayout={assignStart}>
        <Pressable
          onPress={handleTap}
          disabled={!!activeFilter}
          style={
            typeof style === 'object'
              ? {
                  ...styles.pill,
                  ...style,
                  display: isFaded ? 'none' : 'flex',
                }
              : styles.pill
          }
        >
          <Text>{name}</Text>
        </Pressable>
      </Animated.View>
    );
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

export default PillFilterBadge;
