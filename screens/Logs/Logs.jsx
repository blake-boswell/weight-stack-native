import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import TopNav from '../../components/Navigation/TopNav';
import LeftNavButton from '../../components/Navigation/LeftNavButton';
import SessionList from './SessionList';
import Session from './Session';

const Stack = createStackNavigator();


const Logs = ({}) => {

  const customNavHeader = ({ scene, previous, navigation }) => {
    console.log(scene.descriptor.options)
    const { options, params } = scene.descriptor;
    const title = 
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;

    
    return (
      <TopNav 
        title={ title }
        leftButton={
          previous ? 
            <LeftNavButton
              handleBtnPress={navigation.goBack}
              icon={<Feather name="arrow-left" size={24} color="#fff" />}
            />
          : undefined
        }
      />
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="SessionList"
      headerMode="screen"
      screenOptions={( {route} ) => ({
        title: route && route.params ? route.params.headerTitle : undefined,
        header: customNavHeader,
      })} 
    >
      <Stack.Screen
        name="SessionList"
        component={SessionList}
        options={{ 
          title: 'Logs',
        }}
       />
      <Stack.Screen
        name="Session"
        component={Session}
      />
    </Stack.Navigator>
  );
};

export default Logs;