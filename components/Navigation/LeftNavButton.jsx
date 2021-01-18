import React from 'react';
import { Pressable } from 'react-native';

const LeftNavButton = ({ handleBtnPress, icon }) => {


  return (
    <Pressable
      onPress={handleBtnPress}
    >
      { icon }
    </Pressable>
  )
}

export default LeftNavButton;