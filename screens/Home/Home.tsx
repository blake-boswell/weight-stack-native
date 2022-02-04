import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from '../Authentication/Login';

const Home = ({}) => {
  return (
    <View style={styles.tabContainer}>
      <Login />
      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
  },
});

export default Home;
