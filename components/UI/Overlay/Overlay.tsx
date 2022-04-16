import React from 'react';
import { StyleSheet, View } from 'react-native';

const Overlay = () => <View style={styles.cover} />;

const styles = StyleSheet.create({
  cover: {
    position: 'absolute',
    top: -10000,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 1,
    backgroundColor: 'rgba(0, 0, 0, .25)',
  },
});

export default Overlay;
