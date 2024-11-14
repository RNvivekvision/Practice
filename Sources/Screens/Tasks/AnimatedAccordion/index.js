import { useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNStyles, RNText } from '../../../Common';
import { Colors, FontSize, hp, wp } from '../../../Theme';
import data from './data.json';
import Reanimated, {
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';
const collapHeight = wp(8);
const AnimatedPlus = Reanimated.createAnimatedComponent(Plus);
const AnimatedTouchable = Reanimated.createAnimatedComponent(TouchableOpacity);

const AnimatedAccordion = () => {
  return (
    <View style={RNStyles.container}>
      <FlatList
        data={data}
        keyExtractor={(v, i) => String(i)}
        renderItem={({ item, index }) => <Render item={item} index={index} />}
      />
    </View>
  );
};

const Render = ({ item, index }) => {
  const fullHeight = useRef(0);
  const height = useSharedValue(null);
  const progress = useSharedValue(0);
  const baseSpringConfig = {
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
    reduceMotion: ReduceMotion.System,
  };
  const getSpringConfig = isExpanding => ({
    ...baseSpringConfig,
    damping: isExpanding ? 10 : 15, // Less bounce when collapsing
    stiffness: isExpanding ? 100 : 120, // Faster when collapsing
  });

  const onItemPress = item => {
    const isExpand = progress.value === 0;
    console.log({ isExpand });
    progress.value = withTiming(isExpand ? 1 : 0, { duration: 500 });
    height.value = withSpring(
      isExpand ? fullHeight.current : collapHeight,
      getSpringConfig(isExpand),
    );
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const degree = interpolate(progress.value, [0, 1], [0, 45]);
    return {
      transform: [{ rotateZ: `${degree}deg` }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return { height: height.value };
  }, []);

  const onLayout = ({ nativeEvent }) => {
    if (!fullHeight.current) {
      console.log('height -> ', nativeEvent.layout.height);
      fullHeight.current = nativeEvent.layout.height;
      height.value = collapHeight;
    }
  };

  return (
    <AnimatedTouchable
      onLayout={onLayout}
      onPress={() => onItemPress(item)}
      style={[styles.renderContainer, animatedStyle]}>
      <View style={styles.titleContainer}>
        <RNText size={FontSize.font14}>{item.title}</RNText>
        <AnimatedPlus style={plusIconStyle} color={'white'} size={20} />
      </View>
      <RNText style={styles.description}>{item.description}</RNText>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  renderContainer: {
    borderWidth: 1,
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    borderRadius: wp(3),
    borderColor: Colors.Placeholder,
    overflow: 'hidden',
  },
  titleContainer: {
    ...RNStyles.flexRowBetween,
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
  },
  description: {
    fontSize: FontSize.font12,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
});

export default AnimatedAccordion;
