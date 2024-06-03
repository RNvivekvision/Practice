import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { RNButton, RNLoader, RNStyles } from '../../Common';
import { Editing } from '../../Components';
import { Images } from '../../Constants';
import { wp } from '../../Theme';

const ImageEditing = () => {
  const [State, setState] = useState({
    isLoading: false,
    image: { path: Images.DummyImage },
    updatedImage: null,
  });

  const onPickImagePress = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      const image = await ImageCropPicker.openPicker({
        width: 400,
        height: 400,
      });
      if (image?.path) {
        setState(p => ({ ...p, image: image }));
      }
      console.log('Image -> ', JSON.stringify(image, null, 2));
    } catch (e) {
      console.log('Error onPickImagePress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <View style={RNStyles.container}>
      <RNLoader visible={State.isLoading} />

      {State.image ? (
        <Editing imageUri={State.image?.path} />
      ) : (
        <View style={RNStyles.flexCenter}>
          <RNButton
            title={'Pick Image'}
            style={styles.button}
            onPress={onPickImagePress}
          />
        </View>
      )}
    </View>
  );
};

const imageSize = wp(40);
const styles = StyleSheet.create({
  button: {
    width: '85%',
    marginTop: wp(4),
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: wp(3),
    marginHorizontal: wp(2),
    ...RNStyles.shadow,
  },
  image: {
    ...RNStyles.image100,
    borderRadius: wp(3),
  },
});

export default ImageEditing;
