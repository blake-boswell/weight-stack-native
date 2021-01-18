import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default ({children, style, ...rest}) => {
  return (
    <Text 
      style={[style ,styles.text]}
      {...rest}
    >
      {children}
    </Text>
  )

}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  }
});