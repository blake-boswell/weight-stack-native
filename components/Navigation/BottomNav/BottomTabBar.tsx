import React, { useMemo, useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import ActionButton from './ActionButton';
import HomeButton from './HomeButton';
import ProgramButton from './ProgramButton';
import { blue } from '../../../utils/Design';
import Animated, { EasingNode } from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabDescriptor } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

const lineWidth = 75;
const buttonSize = 38;

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
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const lineAnim = useRef(
    new Animated.Value(
      state.routes[state.index].name === 'Home' ? startX : endX,
    ),
  ).current;

  useEffect(() => {
    Animated.timing(lineAnim, {
      toValue: state.routes[state.index].name === 'Home' ? startX : endX,
      duration: 0,
      easing: EasingNode.ease,
    }).start();
  }, [startX]);

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

  const onNavBtnPress = (routeName: string) => {
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

    if (routeName === 'Home') {
      Animated.timing(lineAnim, {
        toValue: startX,
        duration: 200,
        easing: EasingNode.ease,
      }).start();
    } else {
      Animated.timing(lineAnim, {
        toValue: endX,
        duration: 200,
        easing: EasingNode.ease,
      }).start();
    }
  };

  const getStartMeasurements = (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    const offsetStart = width / 2 - lineWidth / 2;
    setStartX(offsetStart);
  };

  const getEndMeasurements = (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    const offsetEnd = x + width / 2 - lineWidth / 2;
    setEndX(offsetEnd);
  };

  return (
    <View style={styles.bottomNav}>
      <Animated.View
        style={{
          position: 'absolute',
          height: 2,
          width: lineWidth,
          top: -3,
          left: lineAnim,
          borderTopWidth: 2,
          borderTopColor: blue,
        }}
      ></Animated.View>
      <HomeButton
        size={buttonSize}
        onPress={() => {
          onNavBtnPress('Home');
        }}
        onLayout={getStartMeasurements}
        isFocused={routes['Home'].isFocused}
        style={{ ...styles.button }}
      />
      <ActionButton
        size={buttonSize}
        style={{
          ...styles.button,
        }}
      />
      <ProgramButton
        size={buttonSize}
        onPress={() => {
          onNavBtnPress('Program');
        }}
        onLayout={getEndMeasurements}
        isFocused={routes['Program'].isFocused}
        style={{ ...styles.button }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    paddingBottom: 25,
    borderTopWidth: 2,
    borderTopColor: '#E5E5E5',
    position: 'relative',
  },
  button: {
    flex: 1,
    paddingTop: 6,
  },
  actionButton: {
    position: 'absolute',
    left: '50%',
  },
});

export default BottomTabBar;
