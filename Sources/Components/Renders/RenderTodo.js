import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import Reanimated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NavRoutes } from '../../Navigation';
import { Images } from '../../Constants';

export default function RenderTodo({ item, index, onDeletePress }) {
  const navigation = useNavigation();

  return (
    <Reanimated.View
      entering={FadeInDown.delay(index * 100)}
      style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate(NavRoutes.TodoDetail, { ...item })}
        style={styles.touchable}>
        <RNText style={styles.title}>{item.title}</RNText>
        <RNText style={styles.description} numOfLines={3}>
          {item.description}
        </RNText>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onDeletePress(item)}
          style={styles.crossContainer}>
          <RNImage source={Images.Plus} style={styles.cross} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: wp(3),
    maxHeight: hp(15),
  },
  touchable: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(3),
  },
  title: {
    fontSize: FontSize.font18,
    fontFamily: FontFamily.Medium,
  },
  description: {
    fontSize: FontSize.font14,
  },
  crossContainer: {
    ...RNStyles.center,
    ...RNStyles.icon,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    backgroundColor: Colors.Black,
    borderRadius: 100,
    top: wp(2),
    right: wp(2),
  },
  cross: {
    ...RNStyles.image50,
    tintColor: Colors.White,
  },
});
