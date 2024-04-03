import { TransitionPresets } from '@react-navigation/stack';
const screenOptions = {
  headerShown: true,
  ...TransitionPresets.SlideFromRightIOS,
};
const NavConfigs = {
  screenOptions,
};
export default NavConfigs;
