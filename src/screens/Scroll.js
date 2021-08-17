import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
} from 'react-native-reanimated';
import ScrollItem, {PAGE_WIDTH} from '../components/ScrollItem';

const titles = ["What's", 'up', 'mobile', 'devs?'];

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

export default function Scroll() {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  }, [translateX.value]);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      console.log(event.translateX);
      translateX.value = event.translationX + context.x;
    },
    onEnd: event => {
      translateX.value = withDecay({velocity: event.velocityX});
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{flex: 1, flexDirection: 'row'}}>
          {titles.map((title, index) => {
            return (
              <ScrollItem
                key={title}
                index={index}
                title={title}
                translateX={clampedTranslateX}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
