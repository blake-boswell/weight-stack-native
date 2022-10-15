import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PillFilters from '../../components/Filter/PillFilters';

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
    <View>
      <PillFilters
        filters={['Quads', 'Hamstrings', 'Bicep', 'Tricep', 'Back', 'Chest']}
        onTap={handleFilterTap}
        onClear={() => setActiveFilter(null)}
      />
    </View>
  );
};

export default Workout;
