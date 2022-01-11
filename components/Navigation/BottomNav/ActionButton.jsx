import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ActionButton = ({size=16, style, isFocused=false, color='#222'}) => {

  const onPress = () => {
    console.log('press');
  }

  return (
    <View style={{ ...styles.container, ...style }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel="add menu"
        onPress={onPress}
        style={{ ...styles.button }}
      >
        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Feather name="plus" size={size} color={isFocused ? blue : color} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    height: 64,
    width: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    position: 'absolute',
    top: -8,
    backgroundColor: '#fff',
  }
})

export default ActionButton;