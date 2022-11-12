import React, { useRef } from 'react';
import {
  Animated,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const EditWorkout = () => {
  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        pan.setOffset(gestureState.dy);
      },
      onPanResponderMove: Animated.event([null, { dy: pan }], {
        useNativeDriver: false,
      }),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (gestureState.dy > 100) {
          Animated.spring(pan, {
            useNativeDriver: true,
            toValue: 0,
            bounciness: 0,
          }).start();
        } else {
          Animated.spring(pan, {
            useNativeDriver: true,
            toValue: 0,
            bounciness: 0,
          }).start();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [{ translateY: pan }],
      }}
    >
      <SafeAreaView style={styles.header} {...panResponder.panHandlers}>
        <Text>V</Text>
        <Text>I am the header</Text>
        <Text>...</Text>
      </SafeAreaView>
      <View style={styles.body}></View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 100,
  },
  body: {
    flexGrow: 1,
  },
});

export default EditWorkout;
