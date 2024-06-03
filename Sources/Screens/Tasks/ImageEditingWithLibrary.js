// Photo Editing using @baronha/react-native-photo-editor

import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import PhotoEditor from '@baronha/react-native-photo-editor';
import { RNButton, RNLoader, RNStyles } from '../../Common';
import { wp } from '../../Theme';

const ImageEditing = () => {
  const [State, setState] = useState({
    isLoading: false,
    image: null,
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

  const onStartEditingPress = async () => {
    setState(p => ({ ...p, isLoading: true }));
    const path = State.image.path.includes('file://')
      ? State.image.path
      : `file://${State.image.path}`;

    try {
      const updatedImage = await PhotoEditor.open({
        path: path,
      });
      setState(p => ({ ...p, updatedImage }));
      console.log('updatedImage -> ', JSON.stringify(updatedImage, null, 2));
    } catch (e) {
      console.log('Error onStartEditingPress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <View style={styles.container}>
      <RNLoader visible={State.isLoading} />
      {State.image ? (
        <>
          <View style={RNStyles.flexRow}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: State.image?.path }}
                resizeMode={'cover'}
                style={styles.image}
                blurRadius={10}
              />
            </View>
            {State.updatedImage && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: State.updatedImage }}
                  resizeMode={'cover'}
                  style={styles.image}
                />
              </View>
            )}
          </View>
          <RNButton
            title={'Start Editing'}
            style={styles.button}
            onPress={onStartEditingPress}
          />
        </>
      ) : (
        <RNButton
          title={'Pick Image'}
          style={styles.button}
          onPress={onPickImagePress}
        />
      )}
    </View>
  );
};

const imageSize = wp(40);
const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    ...RNStyles.center,
  },
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
