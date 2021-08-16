import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256,0.2)',
  false: 'rgba(0,0,0,0.1)',
};

export default function InterpolateColor() {
  const [theme, setTheme] = useState('light');
  //   const progress = useSharedValue(0);

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background],
    );
    return {backgroundColor: backgroundColor};
  });

  const rStyleCircle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  const rStyleText = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );
    return {
      color,
    };
  });
  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rStyleText]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rStyleCircle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggled => {
            //   if (toggled) {
            //     setTheme('dark');
            //     progress.value = withTiming(1);
            //   } else {
            //     setTheme('light');
            //     progress.value = withTiming(0);
            //   }
            setTheme(toggled ? 'dark' : 'light');
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 8,
  },
  text: {
    fontSize: 60,
    textTransform: 'uppercase',
    fontWeight: '200',
    letterSpacing: 10,
    marginBottom: 40,
  },
});
