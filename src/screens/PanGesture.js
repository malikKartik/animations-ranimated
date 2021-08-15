import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const SIZE = 100;
const RADIUS = 180;

export default function PanGesture() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      const x = event.translationX + context.translateX;
      const y = event.translationY + context.translateY;
      if (x > -SCREEN_WIDTH / 2 + 40 && x < SCREEN_WIDTH / 2 - 40) {
        translateX.value = x;
      }
      if (y > -SCREEN_HEIGHT / 2 + 40 && y < SCREEN_HEIGHT / 2 - 40) {
        translateY.value = y;
      }
    },
    onEnd: event => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      //   console.log('distance', distance);
      //   if (distance < RADIUS) {
      //     translateX.value = withSpring(0);
      //     translateY.value = withSpring(0);
      //   }
    },
  });

  const reanimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <View style={[styles.circle]}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, reanimatedStyles]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,255,0.5)',
    borderRadius: 20,
  },
  circle: {
    width: 2 * RADIUS,
    height: 2 * RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0,0,255,0.5)',
  },
});
