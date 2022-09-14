import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  Animated,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabDescriptor } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing } from '../../../styles/core';
import NavButton from './NavButton';
import Dumbell from '../../svg/Dumbell';
import Routine from '../../svg/Routine';

const buttonWidth = 65;

export type RouteNames = 'Routines' | 'Workouts' | 'Stats' | 'Program';

export interface Route {
  key: string;
  isFocused: boolean;
  options: BottomTabDescriptor | undefined;
}

type Routes = Record<RouteNames, Route>;

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [lineStartX, setLineStartX] = useState(0);
  const lineAnim = useRef(new Animated.Value(lineStartX)).current;

  useEffect(() => {
    Animated.timing(lineAnim, {
      toValue: lineStartX,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [lineStartX]);

  const routes = useMemo((): Routes | null => {
    let routes: Routes = {
      Routines: {
        key: '',
        isFocused: false,
        options: undefined,
      },
      Workouts: {
        key: '',
        isFocused: false,
        options: undefined,
      },
      Stats: {
        key: '',
        isFocused: false,
        options: undefined,
      },
      Program: {
        key: '',
        isFocused: false,
        options: undefined,
      },
    };
    state.routes.forEach((route, index) => {
      const { name, key } = route;
      routes[name as RouteNames] = {
        key,
        isFocused: state.index === index,
        options: descriptors[key],
      };
    });

    if (routes) {
      return routes;
    } else {
      return null;
    }
  }, [state, descriptors]);

  const onNavBtnPress = (routeName: RouteNames, lineDestination: number) => {
    const isFocused = routes && routes[routeName].isFocused;
    const target = routes && routes[routeName].key;

    const event = navigation.emit({
      type: 'tabPress',
      target: target || undefined,
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

  return (
    <View>
      <View style={styles.bottomNav}>
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
            onNavBtnPress('Routines', lineDestination);
          }}
          onLayout={e =>
            getStartMeasurements(
              e,
              routes ? routes['Routines'].isFocused : false,
            )
          }
          isFocused={routes ? routes['Routines'].isFocused : false}
          style={{ ...styles.button }}
        >
          <Routine
            size={24}
            color={
              routes && routes['Routines'].isFocused
                ? Colors.primary
                : Colors.text
            }
          />
          <Text
            style={{
              color:
                routes && routes['Routines'].isFocused
                  ? Colors.primary
                  : Colors.text,
            }}
          >
            Routines
          </Text>
        </NavButton>
        <NavButton
          onPress={(e, lineDestination) => {
            onNavBtnPress('Workouts', lineDestination);
          }}
          onLayout={e =>
            getStartMeasurements(
              e,
              routes ? routes['Workouts'].isFocused : false,
            )
          }
          isFocused={routes ? routes['Workouts'].isFocused : false}
          style={{ ...styles.button }}
        >
          <Dumbell
            size={24}
            fill={
              routes && routes['Workouts'].isFocused
                ? Colors.primary
                : Colors.text
            }
          />
          <Text
            style={{
              color:
                routes && routes['Workouts'].isFocused
                  ? Colors.primary
                  : Colors.text,
            }}
          >
            Workouts
          </Text>
        </NavButton>
        <NavButton
          onPress={(e, lineDestination) => {
            onNavBtnPress('Stats', lineDestination);
          }}
          onLayout={e =>
            getStartMeasurements(e, routes ? routes['Stats'].isFocused : false)
          }
          isFocused={routes ? routes['Stats'].isFocused : false}
          style={{ ...styles.button }}
        >
          <Feather
            name="bar-chart"
            size={24}
            color={
              routes && routes['Stats'].isFocused ? Colors.primary : Colors.text
            }
          />
          <Text
            style={{
              color:
                routes && routes['Stats'].isFocused
                  ? Colors.primary
                  : Colors.text,
            }}
          >
            Stats
          </Text>
        </NavButton>
        <NavButton
          onPress={(e, lineDestination) => {
            onNavBtnPress('Program', lineDestination);
          }}
          onLayout={e =>
            getStartMeasurements(
              e,
              routes ? routes['Program'].isFocused : false,
            )
          }
          isFocused={routes ? routes['Program'].isFocused : false}
          style={{ ...styles.button }}
        >
          <Feather
            name="calendar"
            size={24}
            color={
              routes && routes['Program'].isFocused
                ? Colors.primary
                : Colors.text
            }
          />
          <Text
            style={{
              color:
                routes && routes['Program'].isFocused
                  ? Colors.primary
                  : Colors.text,
            }}
          >
            Program
          </Text>
        </NavButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    borderTopWidth: 2,
    borderTopColor: Colors.border,
    position: 'relative',
    backgroundColor: Colors.surface,
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
