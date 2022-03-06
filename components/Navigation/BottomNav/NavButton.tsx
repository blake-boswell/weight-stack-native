import React, { useRef } from 'react';
import {
  View,
  Pressable,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import { Colors } from '../../../styles/core';

interface NavButtonProps {
  children: JSX.Element | JSX.Element[];
  onPress: (event: GestureResponderEvent, lineDestination: number) => void;
  onLayout: (event: LayoutChangeEvent) => void;
  isFocused: boolean;
  style: any;
  color?: string;
}

const NavButton = ({
  children,
  onPress,
  onLayout,
  isFocused,
  style,
  color = Colors.text,
}: NavButtonProps) => {
  const buttonStart = useRef(0);

  const getContainerMeasurements = (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    const buttonWidth = style.width || 65;
    const offsetEnd = x + width / 2 - buttonWidth / 2;
    buttonStart.current = offsetEnd;
    onLayout(e);
  };

  const handlePress = (e: GestureResponderEvent) => {
    onPress(e, buttonStart.current);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={handlePress}
      onLayout={getContainerMeasurements}
      style={{
        color: isFocused ? Colors.primary : Colors.text,
        ...style,
      }}
    >
      <View style={{ position: 'relative', alignItems: 'center' }}>
        {children}
      </View>
    </Pressable>
  );
};

export default NavButton;
