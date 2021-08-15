import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

export default function Basics() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const handleRotation = progress => {
    'worklet';

    return `${progress.value * 2 * Math.PI}rad`;
  };
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
    };
  }, []);

  useEffect(() => {
    progress.value = 1;
    scale.value = 1;
    progress.value = withRepeat(withSpring(0.5), 3, true);
    scale.value = withRepeat(withSpring(2), 3, true);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {height: 100, width: 100, backgroundColor: 'blue'},
          reanimatedStyle,
        ]}
      />
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
});
