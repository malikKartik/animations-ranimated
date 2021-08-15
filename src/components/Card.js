import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import {Dimensions} from 'react-native';
import {AnimatePresence, View as MotiView} from 'moti';
const windowWidth = Dimensions.get('window').width;

const shadowOpt = {
  width: windowWidth * 0.95,
  height: 100,
  color: '#000',
  border: 8,
  radius: 8,
  opacity: 0.1,
  x: 0,
  y: 0,
  style: {},
};

export default function Card({data}) {
  return (
    <MotiView
      from={{opacity: 0, height: 0, right: -400}}
      animate={{opacity: 1, height: 110, right: 0}}
      exit={{opacity: 0, height: 0, right: -400}}
      transition={{
        type: 'timing',
        height: {
          type: 'timing',
          //   delay: 300,
        },
      }}>
      <View style={{marginVertical: 8}}>
        <BoxShadow setting={shadowOpt}>
          <View style={styles.container}>
            <Text>{data?.id}</Text>
          </View>
        </BoxShadow>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
