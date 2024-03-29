import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontSize, hp, wp } from '../Theme';
import { RNStyles, RNText } from '../Common';
import { DummyData } from '../Utils';

const Home = ({ navigation }) => {
  const RenderScreens = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.navigate)}
        style={styles.renderScreens}>
        <RNText size={FontSize.font14}>{item.title}</RNText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={RNStyles.container}>
      <FlatList
        data={DummyData.Screens}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(v, i) => String(i)}
        renderItem={RenderScreens}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: hp(2),
  },
  renderScreens: {
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
});

export default Home;
