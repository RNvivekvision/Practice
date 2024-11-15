import { StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from '../Constants';
import { Colors, wp } from '../Theme';
import RNImage from './RNImage';
import RNStyles from './RNStyles';
import { useInset } from '../Hooks';

export default function RNPlus({ onPress }) {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.closeIcon}>
      <RNImage source={Images.Plus} style={styles.icon} />
    </TouchableOpacity>
  );
}

const size = { cross: wp(15) };
const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    closeIcon: {
      ...RNStyles.center,
      ...RNStyles.shadow,
      width: size.cross,
      height: size.cross,
      borderRadius: 100,
      position: 'absolute',
      bottom: inset.bottom + wp(10),
      right: wp(6),
      zIndex: 1,
      backgroundColor: Colors.Primary,
    },
    icon: {
      ...RNStyles.image50,
      tintColor: Colors.White,
    },
  });
};
