import React from 'react';
import { Colors, hp, wp } from '../Theme';
import { Slider } from 'react-native-awesome-slider';
import { StyleSheet, View } from 'react-native';

const RNSlider = ({
  progress,
  min,
  max,
  onChange,
  thumbWidth,
  theme,
  containerStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        onSlidingComplete={onChange}
        thumbWidth={thumbWidth || wp(4)}
        theme={{
          minimumTrackTintColor: Colors.Primary,
          bubbleBackgroundColor: Colors.White,
          bubbleTextColor: Colors.Primary,
          ...theme,
        }}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1.5),
  },
});

export default RNSlider;
