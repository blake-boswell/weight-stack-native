import React from 'react';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const BackButton = ({ handleBtnPress, styles }) => {


  return (
    <Pressable
      onPress={handleBtnPress}
    >
      <Feather name="arrow-left" size={24} color="#fff" />
    </Pressable>
  )
}

export default BackButton;