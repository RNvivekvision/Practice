import { StatusBar, View } from 'react-native';
import { Colors } from '../Theme';
import { useInset } from '../Hooks';
import RNStyles from './RNStyles';
import RNLoader from './RNLoader';

const RNContainer = ({
  style,
  children,
  isLoading,
  topSafeArea,
  bottomSafeArea,
}) => {
  const inset = useInset();

  return (
    <View
      style={[
        RNStyles.container,
        style,
        topSafeArea && { paddingTop: inset.top },
        bottomSafeArea && { paddingBottom: inset.bottom },
      ]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={Colors.Transparent}
      />
      <RNLoader visible={isLoading} />
      {children}
    </View>
  );
};

export default RNContainer;
