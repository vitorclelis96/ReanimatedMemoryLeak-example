import Animated, {
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

export function getScreenWidth() {
  return Dimensions.get('screen').width;
}

export function getScreenHeight() {
  return Dimensions.get('screen').height;
}

export function getTranslateXInitialValue() {
  return Math.random() * 80 - 40;
}

export function getTranslateYInitialValue() {
  return -(20 + Math.random() * 75);
}

export function getRotateInitialValue() {
  return (Math.PI / 8) * Math.random() - Math.PI / 16;
}

export const useTranslateXAnimatedValue = (
  animatedValue: Animated.SharedValue<number>,
) => {
  const screenWidth = getScreenWidth();

  const xAxisVelocityAnimatedValue = useSharedValue(
    getTranslateXInitialValue(),
  );

  const xAxisOffsetAnimatedValue = useDerivedValue(() => {
    return animatedValue.value ? animatedValue.value / 75 : 0;
  }, [animatedValue]);

  const translateXAnimatedValue = useDerivedValue(() => {
    const prevTranslateXValue: number = translateXAnimatedValue?.value || 0;

    if (
      prevTranslateXValue > screenWidth ||
      prevTranslateXValue < -screenWidth
    ) {
      return prevTranslateXValue;
    }

    return (
      prevTranslateXValue +
      xAxisOffsetAnimatedValue.value * xAxisVelocityAnimatedValue.value
    );
  }, [xAxisOffsetAnimatedValue]);

  return translateXAnimatedValue;
};

export const useTranslateYAnimatedValue = (
  animatedValue: Animated.SharedValue<number>,
) => {
  const screenHeight = getScreenHeight();

  const velocityInitialValue = useSharedValue(getTranslateYInitialValue());

  const yAxisOffsetAnimatedValue = useDerivedValue(() => {
    return animatedValue.value ? animatedValue.value / 75 : 0;
  }, [animatedValue]);

  const yAxisVelocityAnimatedValue = useDerivedValue(() => {
    const prevYAxisVelocityValue: number =
      yAxisVelocityAnimatedValue?.value || velocityInitialValue.value;

    return prevYAxisVelocityValue + yAxisOffsetAnimatedValue.value * 9.8;
  }, [yAxisOffsetAnimatedValue]);

  const translateYAnimatedValue = useDerivedValue(() => {
    const prevTranslateYValue: number = translateYAnimatedValue?.value || 0;

    if (prevTranslateYValue > screenHeight) {
      return prevTranslateYValue;
    }

    return (
      prevTranslateYValue +
      yAxisOffsetAnimatedValue.value * yAxisVelocityAnimatedValue.value
    );
  }, [yAxisVelocityAnimatedValue]);

  return translateYAnimatedValue;
};

export const useRotateAnimatedValue = (
  animatedValue: Animated.SharedValue<number>,
) => {
  const rotateVelocityAnimatedValue = useSharedValue(getRotateInitialValue());

  const rotateAnimatedValue = useDerivedValue(() => {
    return animatedValue.value * rotateVelocityAnimatedValue.value;
  }, [animatedValue]);

  return rotateAnimatedValue;
};
