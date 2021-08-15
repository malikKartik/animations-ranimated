import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;

export default function Page({word, index}) {
  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,255,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square]}></Animated.View>
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
});
