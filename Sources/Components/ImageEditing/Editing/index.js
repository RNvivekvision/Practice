import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Canvas,
  Image,
  useCanvasRef,
  useImage,
} from '@shopify/react-native-skia';
import { RNIcon, RNStyles } from '../../../Common';
import { useInset } from '../../../Hooks';
import { height, width, wp, hp, Colors } from '../../../Theme';
import { Images } from '../../../Constants';
import StickerModal from './StickerModal';
import { useStickerContext } from './StickerContext';
import { GestureHandler } from './GestureHandler';

const Editing = ({ imageUri }) => {
  const { stickers } = useStickerContext();

  const [State, setState] = useState({ showStickerModal: false });
  const canvasRef = useCanvasRef();
  const IMAGE = useImage(imageUri);
  const styles = useStyles();

  if (!IMAGE) return null;

  return (
    <View style={{ flex: 1 }}>
      <Canvas ref={canvasRef} style={{ flex: 1 }}>
        <Image
          image={IMAGE}
          width={width}
          height={height}
          x={0}
          y={0}
          fit={'cover'}
        />
        {stickers.map(({ Sticker, matrix }, index) => {
          return <Sticker key={index} matrix={matrix} />;
        })}
      </Canvas>

      {stickers.map(({ size, matrix }, index) => {
        return <GestureHandler key={index} matrix={matrix} size={size} />;
      })}

      <RNIcon
        icon={Images.Share}
        containerStyle={styles.share}
        iconStyle={RNStyles.image50}
        onPress={() => setState(p => ({ ...p, showStickerModal: true }))}
      />

      <RNIcon
        icon={Images.Instagram}
        containerStyle={styles.add}
        iconStyle={RNStyles.image50}
        onPress={() => setState(p => ({ ...p, showStickerModal: true }))}
      />

      <StickerModal
        visible={State.showStickerModal}
        onClose={() => setState(p => ({ ...p, showStickerModal: false }))}
      />
    </View>
  );
};

const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    add: {
      position: 'absolute',
      top: inset.top + hp(2),
      right: wp(4),
      backgroundColor: Colors.Primary,
      width: wp(12),
      height: wp(12),
      borderRadius: wp(5),
    },
    share: {
      position: 'absolute',
      top: inset.top + hp(2),
      left: wp(4),
      backgroundColor: Colors.Primary,
      width: wp(12),
      height: wp(12),
      borderRadius: wp(5),
    },
  });
};

export default Editing;

// import { StyleSheet, View } from 'react-native';
// import { hp, wp } from '../../../Theme';
// import {
//   Box,
//   Canvas,
//   Image,
//   Mask,
//   Skia,
//   rect,
//   rrect,
//   useCanvasRef,
//   useImage,
// } from '@shopify/react-native-skia';
// import { useInset } from '../../../Hooks';

// const canvasWidth = wp(100);
// const canvasHeight = hp(100) - hp(30);

// const Editing = ({ imageUri }) => {
//   const IMAGE = useImage(imageUri);
//   const canvasRef = useCanvasRef();
//   const styles = useStyles();

//   const rct = rect(0, 0, canvasWidth, canvasHeight);
//   const mask = <Box color={'#fff'} box={rrect(rct, 0, 0)} />;

//   return (
//     <View style={styles.container}>
//       <Canvas ref={canvasRef} style={styles.canvas}>
//         <Mask mask={mask}>
//           {IMAGE && (
//             <Image
//               image={IMAGE}
//               fit={'cover'}
//               width={canvasWidth}
//               height={canvasHeight}
//             />
//           )}
//         </Mask>
//       </Canvas>
//     </View>
//   );
// };

// const useStyles = () => {
//   const inset = useInset();

//   return StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     canvas: {
//       width: canvasWidth,
//       height: canvasHeight,
//     },
//     filtersContainer: {
//       position: 'absolute',
//       bottom: inset.bottom + hp(2),
//       left: 0,
//       right: 0,
//     },
//   });
// };

// const dummyimage =
//   'https://plus.unsplash.com/premium_photo-1695186450461-777ea482f34b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
// const getSKImage = async path => {
//   try {
//     // this works with only https images...
//     const uri = await Skia.Data.fromURI(path);
//     const base64 = Skia.Image.MakeImageFromEncoded(uri);
//     return base64;
//   } catch (e) {
//     console.error('Error getSKImage -> ', e);
//   }
// };

// const onCapturePress = canvasRef => {
//   const skImage = canvasRef.current.makeImageSnapshot();
//   const base64 = skImage.encodeToBase64();
//   return `data:image/png;base64,${base64}`;
// };

// export default Editing;
