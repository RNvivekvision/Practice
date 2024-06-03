import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RNDropDown, RNStyles } from '../../../Common';
import { Colors, wp } from '../../../Theme';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Rotate from './Rotate';
import Scale from './Scale';

const Editing = ({ imageUri }) => {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const [State, setState] = useState({
    resizeMode: 'contain',
    rotate: { label: '0 Deg', value: 0 },
  });

  const source = typeof imageUri === 'number' ? imageUri : { uri: imageUri };

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Reanimated.Image
          source={source}
          resizeMode={State.resizeMode}
          style={[styles.image, imageStyle]}
        />
      </View>

      <ScrollView>
        <RNDropDown
          placeholder={'Resize Mode'}
          data={ResizeModes}
          dropdownStyle={styles.dropdownStyle}
          value={State.resizeMode}
          onChange={({ value }) => setState(p => ({ ...p, resizeMode: value }))}
        />

        <Rotate
          progress={rotate}
          onChange={v => {
            rotate.value = withTiming(v);
          }}
        />

        <Scale
          progress={scale}
          onChange={v => {
            scale.value = withTiming(v);
          }}
        />
      </ScrollView>
    </View>
  );
};

const imageSize = wp(100);
const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
  },
  imageContainer: {
    backgroundColor: Colors.Black + '50',
    alignItems: 'center',
    overflow: 'hidden',
    // paddingVertical: wp(5),
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
  dropdownStyle: {
    borderWidth: 1,
    marginHorizontal: wp(2),
  },
});

const ResizeModes = [
  { label: 'center', value: 'center' },
  { label: 'contain', value: 'contain' },
  { label: 'cover', value: 'cover' },
  { label: 'repeat', value: 'repeat' },
  { label: 'stretch', value: 'stretch' },
];

export default Editing;
