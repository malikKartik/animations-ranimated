import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Story from '../components/Story';

const STORIES = ['first', 'second', 'third', 'forth', 'fifth'];
export default function Stories() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        pagingEnabled
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {STORIES.map((story, index) => {
          return (
            <Story
              title={story}
              key={story}
              index={index}
              translateX={translateX}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
