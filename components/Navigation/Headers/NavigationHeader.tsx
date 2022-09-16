import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../styles/core';

const NavigationHeader = ({
  navigation,
  route,
  options,
}: BottomTabHeaderProps) => {
  console.log({ navigation, route, options });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        <Text>Back</Text>
        <Text>Header</Text>
      </View>
      <View style={styles.right}>
        <Pressable>
          <Feather name="search" size={24} />
        </Pressable>
        <Pressable>
          <Feather name="plus" size={24} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: Colors.red,
    // height: 500,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: Colors.red,
    // height: 500,
  },
});

export default NavigationHeader;
