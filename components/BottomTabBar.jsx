import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Design from '../utils/Design';

const Icon = ({name, isFocused, color='#222', size}) => {

  switch (name) {
    case 'Home':
      return (
        <View style={{alignItems: 'center'}}>
          <Feather name="home" size={size} color={isFocused ? Design.blue : color} />
        </View>
      );
    case 'Logs':
      return (
        <View style={{alignItems: 'center'}}>
          <Feather name="book-open" size={size} color={isFocused ? Design.blue : color} />
        </View>
      );
    case 'Program':
      return (
        <View style={{alignItems: 'center'}}>
          <Feather name="calendar" size={size} color={isFocused ? Design.blue : color} />
        </View>
      );
    default:
      return null;
  }

}

const BottomTabBar = ({state, descriptors, navigation}) => {

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, paddingTop: 6 }}
          >
          <View style={{alignItems: 'center'}}>
            <Icon name={route.name} size={24} isFocused={isFocused} />
            <Text style={{ color: isFocused ? Design.blue : '#222' }}>
              {label}
            </Text>
          </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    paddingBottom: 25,
    borderTopWidth: 2,
    borderTopColor: '#E5E5E5',
  },
});

export default BottomTabBar;