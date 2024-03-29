import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavConfigs, NavRoutes } from './index';
import { Home, WebForm } from '../Screens';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={NavRoutes.Home} component={Home} />
        <Stack.Screen name={NavRoutes.WebForm} component={WebForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
