import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  Animated,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native';
import ActionButton from './ActionButton';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabDescriptor } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing } from '../../../styles/core';
import NavButton from './NavButton';
import Dumbell from '../../svg/Dumbell';
import Overlay from '../../UI/Overlay/Overlay';

const buttonWidth = 65;

interface Routes {
  [name: string]: {
    key: string;
    isFocused: boolean;
    options: BottomTabDescriptor;
  };
}

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [lineStartX, setLineStartX] = useState(0);
  const lineAnim = useRef(new Animated.Value(lineStartX)).current;

  useEffect(() => {
    Animated.timing(lineAnim, {
      toValue: lineStartX,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [lineStartX]);

  const routes = useMemo((): Routes => {
    let routes: Routes = {};
    state.routes.forEach((route, index) => {
      const { name, key } = route;
      routes[name] = {
        key,
        isFocused: state.index === index,
        options: descriptors[key],
      };
    });
    return routes;
  }, [state, descriptors]);

  const onNavBtnPress = (routeName: string, lineDestination: number) => {
    const isFocused = routes[routeName].isFocused;
    const target = routes[routeName].key;

    const event = navigation.emit({
      type: 'tabPress',
      target: target,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }

    Animated.spring(lineAnim, {
      toValue: lineDestination,
      useNativeDriver: true,
      bounciness: 0,
      speed: 20,
    }).start();
  };

  const getStartMeasurements = (e: LayoutChangeEvent, isFocused: boolean) => {
    if (isFocused) {
      const { x, width } = e.nativeEvent.layout;
      const offsetStart = x + width / 2 - buttonWidth / 2;
      setLineStartX(offsetStart);
    }
  };

  const handleActionButtonPress = (
    e: NativeSyntheticEvent<NativeTouchEvent>,
    isMenuOpen: boolean,
  ) => {
    setShowOverlay(isMenuOpen);
  };

  return (
    <View style={styles.bottomNav}>
      {showOverlay && <Overlay />}
      <Animated.View
        style={{
          position: 'absolute',
          height: 2,
          width: buttonWidth,
          top: -3,
          transform: [{ translateX: lineAnim }],
          borderTopWidth: 2,
          borderTopColor: Colors.primary,
        }}
      ></Animated.View>
      <NavButton
        onPress={(e, lineDestination) => {
          onNavBtnPress('Home', lineDestination);
        }}
        onLayout={e => getStartMeasurements(e, routes['Home'].isFocused)}
        isFocused={routes['Home'].isFocused}
        style={{ ...styles.button }}
      >
        <Feather
          name="home"
          size={24}
          color={routes['Home'].isFocused ? Colors.primary : Colors.text}
        />
        <Text
          style={{
            color: routes['Home'].isFocused ? Colors.primary : Colors.text,
          }}
        >
          Home
        </Text>
      </NavButton>
      <NavButton
        onPress={(e, lineDestination) => {
          onNavBtnPress('Workouts', lineDestination);
        }}
        onLayout={e => getStartMeasurements(e, routes['Workouts'].isFocused)}
        isFocused={routes['Workouts'].isFocused}
        style={{ ...styles.button }}
      >
        <Dumbell
          size={24}
          fill={routes['Workouts'].isFocused ? Colors.primary : Colors.text}
        />
        <Text
          style={{
            color: routes['Workouts'].isFocused ? Colors.primary : Colors.text,
          }}
        >
          Workouts
        </Text>
      </NavButton>
      <ActionButton
        size={48}
        style={{
          ...styles.button,
          ...styles.actionButton,
        }}
        onPress={handleActionButtonPress}
      />
      <NavButton
        onPress={(e, lineDestination) => {
          onNavBtnPress('Stats', lineDestination);
        }}
        onLayout={e => getStartMeasurements(e, routes['Stats'].isFocused)}
        isFocused={routes['Stats'].isFocused}
        style={{ ...styles.button }}
      >
        <Feather
          name="bar-chart"
          size={24}
          color={routes['Stats'].isFocused ? Colors.primary : Colors.text}
        />
        <Text
          style={{
            color: routes['Stats'].isFocused ? Colors.primary : Colors.text,
          }}
        >
          Stats
        </Text>
      </NavButton>
      <NavButton
        onPress={(e, lineDestination) => {
          onNavBtnPress('Program', lineDestination);
        }}
        onLayout={e => getStartMeasurements(e, routes['Program'].isFocused)}
        isFocused={routes['Program'].isFocused}
        style={{ ...styles.button }}
      >
        <Feather
          name="calendar"
          size={24}
          color={routes['Program'].isFocused ? Colors.primary : Colors.text}
        />
        <Text
          style={{
            color: routes['Program'].isFocused ? Colors.primary : Colors.text,
          }}
        >
          Program
        </Text>
      </NavButton>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderTopWidth: 2,
    borderTopColor: Colors.border,
    position: 'relative',
  },
  button: {
    flex: 1,
    paddingTop: Spacing.xs,
    width: buttonWidth,
  },
  actionButton: {
    // position: 'absolute',
    // left: '50%',
    transform: [{ translateY: -16 }],
  },
});

export default BottomTabBar;
