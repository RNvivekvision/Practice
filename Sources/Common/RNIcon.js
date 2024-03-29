import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { wp } from '../Theme';
import RNStyles from './RNStyles';
import RNImage from './RNImage';

const RNIcon = ({ icon, onPress, containerStyle, iconStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <RNImage source={icon} style={[RNStyles.image80, iconStyle]} />
    </TouchableOpacity>
  );
};

const size = wp(8);
const styles = StyleSheet.create({
  container: {
    ...RNStyles.center,
    width: size,
    height: size,
  },
});

export default RNIcon;
