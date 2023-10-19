import React, {useEffect, useRef} from 'react';
import {AnimatedBlock} from './types';
import {
  Easing,
  cancelAnimation,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {View} from 'react-native';
import {AnimatedBlockItem} from './AnimatedBlockItem';

export const AnimatedBlockList: React.FC<AnimatedBlock> = ({
  id,
  onEnd,
  xPosition,
  yPosition,
}) => {
  const animatedValue = useSharedValue(0);

  const list = useRef(new Array(10).fill(1)).current;

  useEffect(() => {
    animatedValue.value = withTiming(
      1200,
      {
        duration: 1200,
        easing: Easing.linear,
      },
      () => {
        cancelAnimation(animatedValue);

        runOnJS(onEnd)();
      },
    );
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        left: xPosition,
        top: yPosition,
        zIndex: 10,
      }}>
      {list.map((_, index) => (
        <AnimatedBlockItem
          animatedValue={animatedValue}
          key={`${id}-${index}`}
        />
      ))}
    </View>
  );
};
