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
      alwaysBounceHorizontal={false}
    >
      {activeFilter && <View style={{ height: 27, width: 0 }} />}
      {filters.map(filter => (
        <PillFilter
          key={filter}
          name={filter}
          style={styles.pill}
          activeFilter={activeFilter}
          onTap={e => handleTap(e, filter)}
        />
      ))}
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
    paddingStart: 16,
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
