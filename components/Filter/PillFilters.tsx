import React, { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../styles/core';
import PillFilter from './PillFilter';

export interface PillFiltersProps {
  filters: string[];
  onTap: (filter: string) => void;
  onClear: () => void;
}

const PillFilters = ({ filters, onTap, onClear }: PillFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const clearOpacity = useRef(new Animated.Value(0)).current;

  const handleTap = (e: GestureResponderEvent, filter: string) => {
    if (filter === activeFilter) {
      handleClear();
    } else {
      setActiveFilter(filter);
      onTap(filter);
      Animated.timing(clearOpacity, {
        delay: 150,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleClear = () => {
    onClear();
    setActiveFilter(null);
    Animated.timing(clearOpacity, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
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
      </ScrollView>
      {activeFilter && (
        <Animated.View
          style={{
            position: 'absolute',
            right: 16,
            opacity: clearOpacity,
          }}
        >
          <Pressable style={styles.clear} onPress={() => handleClear()}>
            <Text style={styles.clearText}>Clear</Text>
            <Feather name="x" size={20} style={styles.clearIcon} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  scroll: {
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
  clear: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    color: Colors.danger,
  },
  clearText: {
    color: Colors.danger,
    fontSize: Typography.text.base.fontSize,
  },
  clearIcon: {
    color: Colors.danger,
  },
});

export default PillFilters;
