import React, {useCallback, useState} from 'react';
import {Button, Dimensions, View} from 'react-native';
import {AnimatedBlock} from './types';
import {AnimatedBlockList} from './AnimatedBlockList';

const {height, width} = Dimensions.get('window');

// NOT REALLY SAFE BUT SHOULD WORK FOR DEMO PURPOSES
const randomUuidGenerator = () => {
  const first = Math.round(Math.random() * 1000000000);
  const second = Math.round(Math.random() * 1000000000);
  const third = Math.round(Math.random() * 1000000000);
  return `${first}-${second}-${third}`;
};

export const EmojiMemoryLeak = () => {
  const [animatedBlocks, setAnimatedBlocks] = useState<AnimatedBlock[]>([]);

  const onButtonPress = useCallback(() => {
    setAnimatedBlocks(prevValues => {
      const nextId = randomUuidGenerator();
      return [
        ...prevValues,
        {
          xPosition: Math.random() * width,
          yPosition: Math.random() * height,
          id: nextId,
          onEnd: () => {
            setAnimatedBlocks(prevValues => {
              const newList = prevValues.filter(
                animatedBlock => animatedBlock.id !== nextId,
              );
              return newList;
            });
          },
        },
      ];
    });
  }, [setAnimatedBlocks]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Press me" onPress={onButtonPress} />
      </View>
      {animatedBlocks.map(animatedBlock => (
        <AnimatedBlockList key={animatedBlock.id} {...animatedBlock} />
      ))}
    </View>
  );
};
