import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../../styles/core';
import { Gap } from '../../Layout/Gap';
import Heading from '../../UI/Typography/Heading';

const NavigationHeader = ({
  navigation,
  route,
  options,
}: BottomTabHeaderProps) => {
  console.log({ navigation, route, options });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        {navigation.canGoBack() && (
          <Pressable>
            <Feather name="chevron-left" size={24} />
          </Pressable>
        )}
        <Heading size={3}>{route.name}</Heading>
      </View>
      <Gap size={Spacing.sm} horizontal style={styles.right}>
        <Pressable>
          <Feather name="search" size={24} />
        </Pressable>
        <Pressable>
          <Feather name="plus" size={28} />
        </Pressable>
      </Gap>
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
    alignItems: 'center',
    // backgroundColor: Colors.red,
    // height: 500,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: Colors.red,
    // height: 500,
  },
});

export default NavigationHeader;
