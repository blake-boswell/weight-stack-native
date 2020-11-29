import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import menuIcon from '../images/menu.png';
// import { Button } from 'native-base';

const TopNav = ({title = 'Weight Stack'}) => {

  const toggleMenu = () => {
    console.log('Openning Menu...')
  }

  return (
    <View style={styles.navContainer}>
      <View style={styles.navContent}>
        <View style={styles.navLeft}>
          <Pressable
            onPress={toggleMenu}
          >
            <Image style={styles.menuIcon} source={menuIcon}/>
          </Pressable>
        </View>
        <View style={styles.navMiddle}>
          <Text style={styles.navTitle}>{title}</Text>
        </View>
        <View style={styles.navRight}>
        </View>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  baseFont: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  navContainer: {
    height: 100,
    paddingTop: 30,
    backgroundColor: '#247BA0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  navContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  navLeft: {
    flex: 1,
    justifyContent: 'center',
    width: '25%',
    paddingLeft: 24,
  },
  navMiddle: {
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    width: '50%',
  },
  navRight: {
    width: '25%',
  },
  navTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#fff',
  },
  menuIcon: {
    height: 25,
    tintColor: '#fff',
  }
});

export default TopNav;