import { useRef } from 'react';
import { View, TouchableOpacity, Animated, Text, Easing } from 'react-native';
import { Foundation } from '@expo/vector-icons';

const FoundationFloatingText = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.out(Easing.back(2)),
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(2)),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset the opacity value for next time the icon is pressed
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const animatedIconStyle = {
    transform: [{ scale: scaleValue }],
  };

  const animatedTextStyle = {
    opacity: opacityValue,
    position: 'absolute',
    bottom: 4,
    left: 30,
    textAlign: 'right',
    color: 'green',
    fontSize: 14,
  };

  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View style={animatedIconStyle}>
          <Foundation name="dollar-bill" size={24} color="green" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.Text style={animatedTextStyle}>Thanks for the tip!</Animated.Text>
    </View>
  );
};

export default FoundationFloatingText;
