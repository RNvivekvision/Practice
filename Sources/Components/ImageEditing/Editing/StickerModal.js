import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Colors, height, width, wp } from '../../../Theme';
import { RNButton, RNStyles } from '../../../Common';
import { stickers } from './Stickers';
import {
  Canvas,
  Group,
  Skia,
  fitbox,
  processTransform2d,
  rect,
} from '@shopify/react-native-skia';
import { deflate } from './Stickers/helper';
import { useCallback } from 'react';
import { makeMutable } from 'react-native-reanimated';
import { useStickerContext } from './StickerContext';

const COLS = 2;
const tileWidth = width / COLS;
const tileHeight = 125;

const StickerModal = ({ visible, onClose }) => {
  const { addSticker } = useStickerContext();

  const onPress = useCallback((Sticker, size) => {
    const src = rect(0, 0, size.width, size.height);
    const dst = deflate(rect(0, 0, width, height), 16);
    const m3 = processTransform2d(fitbox('contain', src, dst));
    const matrix = makeMutable(m3);
    addSticker({
      Sticker,
      size,
      matrix,
    });
    onClose();
  }, []);

  return (
    <Modal
      animationType={'slide'}
      visible={visible}
      presentationStyle={'pageSheet'}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={{ alignItems: 'flex-end' }}>
          <RNButton title={'X'} style={styles.close} onPress={onClose} />
        </View>
        <ScrollView>
          <View style={RNStyles.flexWrapHorizontal}>
            {stickers.map(({ Sticker, size }, index) => {
              const { width, height } = size;
              const src = rect(0, 0, width, height);
              const dst = deflate(rect(0, 0, tileWidth, tileHeight), 12);
              const transform = fitbox('contain', src, dst);
              return (
                <Pressable
                  key={index}
                  onPress={onPress.bind(null, Sticker, size)}>
                  <Canvas style={{ width: tileWidth, height: tileHeight }}>
                    <Group transform={transform}>
                      <Sticker matrix={Skia.Matrix()} />
                    </Group>
                  </Canvas>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
  close: {
    width: wp(10),
    height: wp(10),
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 100,
    marginHorizontal: wp(4),
  },
});

export default StickerModal;
