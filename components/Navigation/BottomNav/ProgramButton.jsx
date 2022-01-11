import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { blue } from '../../../utils/Design';

const ProgramButton = ({
  size,
  onPress,
  options,
  onLayout,
  isFocused,
  style,
  color = '#222',
}) => {
  const getContainerMeasurements = e => {
    onLayout(e);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
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
