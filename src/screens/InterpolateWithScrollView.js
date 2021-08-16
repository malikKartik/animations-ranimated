import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from '../components/Page';

const WORDS = ["What's", 'up', 'mobile', 'dev'];

export default function InterpolateWithScrollView() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={styles.container}>
      {WORDS.map((word, index) => {
        return (
          <Page key={word} word={word} index={index} translateX={translateX} />
        );
      })}
    </Animated.ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
