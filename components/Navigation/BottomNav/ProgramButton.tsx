import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { blue } from '../../../utils/Design';

interface ProgramButtonProps {
  size: number;
  onPress: (event: GestureResponderEvent) => void;
  onLayout: (event: LayoutChangeEvent) => void;
  isFocused: boolean;
  style: any;
  color?: string;
}

const ProgramButton = ({
  size,
  onPress,
  onLayout,
  isFocused,
  style,
  color = '#222',
}: ProgramButtonProps) => {
  const getContainerMeasurements = (e: LayoutChangeEvent) => {
    onLayout(e);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLayout={getContainerMeasurements}
      style={{
        ...style,
      }}
    >
      <View style={{ position: 'relative', alignItems: 'center' }}>
        {/* {isFocused &&
          <View style={{ position: 'absolute', height: 2, width: 75, top: -8, borderTopWidth: 2, borderTopColor: blue }}></View>
        } */}
        <View style={{ alignItems: 'center' }}>
          <Feather
            name="calendar"
            size={size}
            color={isFocused ? blue : color}
          />
        </View>
        <Text style={{ color: isFocused ? blue : '#222' }}>Program</Text>
      </View>
    </Pressable>
  );
};

export default ProgramButton;
