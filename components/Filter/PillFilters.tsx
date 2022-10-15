import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing } from '../../styles/core';
import Button from '../UI/Button/Button';
import { Gap } from '../Layout/Gap';
import PillFilter from './PillFilter';

export interface PillFiltersProps {
  filters: string[];
  onTap: (filter: string) => void;
  onClear: () => void;
}

const PillFilters = ({ filters, onTap, onClear }: PillFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const clearFadeAnim = useRef(new Animated.Value(0)).current;

  // const handleTap = (e: GestureResponderEvent, filter: string) => {
  //   console.log({
  //     start: e.nativeEvent.pageX - e.nativeEvent.locationX,
  //     end: 0,
  //   });
  //   onTap(filter);
  //   setXStartPos(e.nativeEvent.pageX - e.nativeEvent.locationX);
  //   setActiveFilter(filter);
  // };

  const handleTap = (e: GestureResponderEvent, filter: string) => {
    console.log('Tap on ', filter, '. Active: ', activeFilter);
    if (filter === activeFilter) {
      setActiveFilter(null);
      onClear();
    } else {
      setActiveFilter(filter);
      onTap(filter);
    }
  };

  const handleClear = () => {
    console.log('Clearing...');
    onClear();
    setActiveFilter(null);
  };

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.spacer} />
      {filters.map(filter => (
        <PillFilter
          key={filter}
          name={filter}
          style={styles.pill}
          activeFilter={activeFilter}
          onTap={e => handleTap(e, filter)}
        />
      ))}
      {/* <>
          {activeFilter ? (
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
              <Pressable onPress={e => handleClear()} style={styles.pill}>
                <Text>{activeFilter}</Text>
              </Pressable>
            </Animated.View>
          ) : (
            <>
              {filters.map(filter => (
                <Pressable
                  onPress={e => handleTap(e, filter)}
                  key={filter}
                  style={styles.pill}
                >
                  <Text>{filter}</Text>
                </Pressable>
              ))}
            </>
          )}
        </> */}
      {/* {activeFilter && (
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            opacity: clearFadeAnim,
          }}
        >
          <Button
            round
            variant="outline-danger"
            style={styles.clearButton}
            onPress={() => handleClear()}
          >
            <Feather name="x" size={20} />
          </Button>
        </Animated.View>
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  pill: {
    marginRight: Spacing.xxs,
  },
  pill__active: {
    borderColor: Colors.accent,
  },
  spacer: {
    width: 16,
  },
  clearButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});

export default PillFilters;
