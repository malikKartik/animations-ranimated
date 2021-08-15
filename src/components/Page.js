import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;

export default function Page({word, index, translateX}) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const reanimatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const reanimatedStyleText = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-1, 1, -1],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: translateY}],
      opacity,
    };
  });
  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,255,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, reanimatedStyles]}></Animated.View>
      <Animated.View style={[{position: 'absolute'}, reanimatedStyleText]}>
        <Text style={styles.text}>{word}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,255,0.5)',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '400',
  },
});
