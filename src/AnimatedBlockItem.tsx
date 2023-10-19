import React, {useEffect} from 'react';
import Animated, {
  SharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from 'react-native-reanimated';
// TODO: Move this for the demo
import {
  useRotateAnimatedValue,
  useTranslateXAnimatedValue,
  useTranslateYAnimatedValue,
} from './hooks';
import {View} from 'react-native';

type AnimatedBlockItemProps = {
  animatedValue: SharedValue<number>;
};

export const AnimatedBlockItem: React.FC<AnimatedBlockItemProps> = ({
  animatedValue,
}) => {
  const translateXAnimatedValue = useTranslateXAnimatedValue(animatedValue);
  const translateYAnimatedValue = useTranslateYAnimatedValue(animatedValue);
  const rotateAnimatedValue = useRotateAnimatedValue(animatedValue);

  console.log('nani?!?!');

  const textStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      transform: [
        {translateX: translateXAnimatedValue.value},
        {translateY: translateYAnimatedValue.value},
        {rotate: `${rotateAnimatedValue.value}deg`},
      ],
    };
  });

  useEffect(() => {
    console.log(
      `[AnimatedExplosionTextBlockItem][${Date.now()}]: Starting a frame callback`,
    );

    return () => {
      console.log(
        `[AnimatedExplosionTextBlockItem][${Date.now()}]: Unmounting the component`,
      );

      cancelAnimation(translateXAnimatedValue);
      cancelAnimation(translateYAnimatedValue);
      cancelAnimation(rotateAnimatedValue);
    };
  }, []);

  console.log('haushua');

  return (
    <Animated.View style={textStyle}>
      <View
        style={{width: 50, height: 50, backgroundColor: 'red', zIndex: 1}}
      />
    </Animated.View>
  );
};
