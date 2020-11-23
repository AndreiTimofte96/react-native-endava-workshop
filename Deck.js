import { PanResponder, Animated, Dimensions } from 'react-native';
import React, { useRef } from 'react';

import CoffeeShop from './CoffeeShop';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 4;
const SWIPE_DURATION = 50;

const Deck = ({ data, onSwipe }) => {
  const position = useRef(new Animated.ValueXY()).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true
    }).start();
  };

  const onSwipeCallback = (direction) => {
    onSwipe(direction);
    position.setValue({ x: 0, y: 0 });
  }

  const forceSwipe = (direction, onSwipeComplete) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 0,
      useNativeDriver: true,
    }).start(() => onSwipeComplete(direction));
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right', onSwipeCallback);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left', onSwipeCallback);
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const getCardStyle = (position) => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    })
    return {
      transform: [...position.getTranslateTransform(), { rotate }],
    }
  }

  return (
    <>
      {data.map((item, index) => {
        if (index === 0) {
          return (
            <Animated.View key={item.id} style={getCardStyle(position)} {...panResponder.panHandlers}>
              <CoffeeShop item={item} />
            </Animated.View>
          );
        }
        return <CoffeeShop key={item.id} item={item} />
      })
      }
    </>
  );
}

export default Deck;