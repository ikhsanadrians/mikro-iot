import React, { useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';

const DraggableComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gesture) => {
      return gesture.numberActiveTouches === 1;
    },
    onPanResponderMove: (event, gesture) => {
      setPosition({
        x: position.x + gesture.dx,
        y: position.y + gesture.dy,
      });
    },
    onPanResponderRelease: () => {},
  });

  return (
    <View
      style={[styles.box, { transform: [{ translateX: position.x }, { translateY: position.y }] }]}
      {...panResponder.panHandlers}
    />
  );
};



const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

export default DraggableComponent;
