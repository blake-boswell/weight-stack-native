import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PillFilter from '../../components/UI/Filter/PillFilter';

const Workout = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterTap = (filter: string) => {
    console.log(filter);
    if (filter === activeFilter) {
      // Toggle filter off
      setActiveFilter(null);
    } else {
      // Toggle filter on
      setActiveFilter(filter);
    }
  };
  return (
    <View style={styles.container}>
      <PillFilter
        filters={['Quads', 'Hamstrings', 'Bicep', 'Tricep', 'Back', 'Chest']}
        onTap={handleFilterTap}
        onClear={() => setActiveFilter(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});

export default Workout;
