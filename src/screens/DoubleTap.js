import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function DoubleTap() {
  const scale = useSharedValue(0);
  const [showName, setShowName] = useState(false);
  const opacity = useDerivedValue(() => {
    return showName ? withTiming(1) : withTiming(0);
  }, [showName]);

  const reanimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: Math.max(scale.value, 0)}],
    };
  });

  const reanimatedStylesText = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const doubleTapRef = useRef();

  const onDoubleTap = useCallback(() => {
    setShowName(false);
    opacity.value = 0;
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = () => {
    setShowName(!showName);
  };
  return (
    <View style={[styles.container]}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}>
          <Animated.View>
            <ImageBackground
              source={require('../assets/image1.jpeg')}
              style={[styles.image]}>
              <Animated.View style={[styles.textWrapper, reanimatedStylesText]}>
                <Text style={[styles.text]}>kartik._malik</Text>
              </Animated.View>
              <AnimatedImage
                source={require('../assets/heart.png')}
                style={[styles.heart, reanimatedStyles]}
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
}

const {width: SIZE} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: SIZE,
    width: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    height: 150,
    width: 150,
    shadowOffset: {
      height: 20,
      width: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 0.5,
  },
  textWrapper: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1f1f1fee',
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
