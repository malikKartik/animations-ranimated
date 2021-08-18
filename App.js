import React from 'react';
import {View} from 'react-native';
// import List from './src/screens/List';
import 'react-native-reanimated';
import Basics from './src/screens/Basics';
import InterpolateColor from './src/screens/InterpolateColor';
import InterpolateWithScrollView from './src/screens/InterpolateWithScrollView';
import PanGesture from './src/screens/PanGesture';
import DoubleTap from './src/screens/DoubleTap';
import Stories from './src/screens/Stories';
import Scroll from './src/screens/Scroll';
import ProgressBar from './src/screens/ProgressBar';

const App = () => {
  return (
    <View style={{height: '100%', width: '100%'}}>
      {/* <List></List> */}
      {/* <Basics /> */}
      {/* <PanGesture /> */}
      {/* <InterpolateWithScrollView /> */}
      {/* <InterpolateColor /> */}
      {/* <Stories /> */}
      {/* <DoubleTap /> */}
      {/* <Scroll /> */}
      <ProgressBar />
    </View>
  );
};

export default App;
