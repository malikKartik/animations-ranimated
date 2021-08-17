import React from 'react';
import {Dimensions, StyleSheet, View, Image} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import image from '../assets/image1.jpeg';

const {height, width} = Dimensions.get('window');

export default function Story({title, translateX, index}) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const reanimatedStyles = useAnimatedStyle(() => {
    const rotateY = interpolate(
      translateX.value,
      inputRange,
      [15, 0, -15],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{perspective: -400}, {rotateY: `${rotateY}deg`}, {scale}],
      // transform: [{scale}],
      opacity,
    };
  });
  return (
    <View style={[styles.storyContainer]}>
      <Animated.View style={[styles.card, reanimatedStyles]}>
        <View style={styles.image}>
          <Image
            source={image}
            style={{height: '100%', width: '100%', resizeMode: 'cover'}}
          />
        </View>
        <View style={styles.input} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  storyContainer: {
    paddingVertical: 40,
    width: width,
    height,
  },
  card: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
  },
  image: {
    height: '90%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 20,
  },
  input: {
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
    borderRadius: 20,
  },
});
