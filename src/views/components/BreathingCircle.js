import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const BreathingCircle = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3, 
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.circle, { transform: [{ scale: scaleValue }] }]}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 120,  
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(78, 184, 160, 0.5)',
  },
});

export default BreathingCircle;