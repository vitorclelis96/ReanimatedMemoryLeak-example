import React, {useCallback, useRef} from 'react';
import {Button, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const BuglessExample = React.memo(() => {
  const scaleValue = useSharedValue(1);
  const prevScale = useRef(1);

  const buglessPress = useCallback(() => {
    if (!!prevScale.current) {
      prevScale.current = 0;
      scaleValue.value = withTiming(0);
    } else {
      prevScale.current = 1;
      scaleValue.value = withTiming(1);
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scaleValue.value,
      },
    ],
  }));

  return (
    <>
      <Animated.View
        style={[
          {width: '100%', height: 100, backgroundColor: 'blue'},
          animatedStyle,
        ]}
      />
      <Button title="Bugless Press Me" onPress={buglessPress} />
    </>
  );
});
