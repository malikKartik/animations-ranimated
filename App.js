import React from 'react';
import {SafeAreaView} from 'react-native';
// import List from './src/screens/List';
import 'react-native-reanimated';
import Basics from './src/screens/Basics';
import InterpolateWithScrollView from './src/screens/InterpolateWithScrollView';
import PanGesture from './src/screens/PanGesture';

const App = () => {
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      {/* <List></List> */}
      {/* <Basics /> */}
      {/* <PanGesture /> */}
      <InterpolateWithScrollView />
    </SafeAreaView>
  );
};

export default App;
