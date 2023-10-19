import React, {useEffect} from 'react';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {View} from 'react-native';
import {AnimatedBlock} from './types';

export const AnimatedBlockItem: React.FC<AnimatedBlock> = React.memo(
  ({id, onEnd, xPosition, yPosition}) => {
    const animatedValue = useSharedValue(1);

    useEffect(() => {
      animatedValue.value = withTiming(
        0,
        {
          duration: 1200,
          easing: Easing.linear,
        },
        () => {
          cancelAnimation(animatedValue);

          runOnJS(onEnd)();
          /*
        setTimeout(() => {
          runOnJS(onEnd)();
        }, 0)
        */
        },
      );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{scale: animatedValue.value}],
    }));

    return (
      <View
        style={{
          position: 'absolute',
          left: xPosition,
          top: yPosition,
          zIndex: 10,
        }}>
        <Animated.View
          style={[
            {width: 50, height: 50, backgroundColor: 'red', zIndex: 1},
            animatedStyle,
          ]}
        />
      </View>
    );
  },
  (prev, next) => prev.id === next.id,
);
