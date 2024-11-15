import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavConfigs, NavRoutes } from './index';
import {
  Home,
  OpenAi,
  WebForm,
  ImageEditing,
  AnimatedAccordion,
  TodoApp,
  TodoDetail,
} from '../Screens';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
        <Stack.Screen name={NavRoutes.Home} component={Home} />
        <Stack.Screen name={NavRoutes.WebForm} component={WebForm} />
        <Stack.Screen name={NavRoutes.OpenAI} component={OpenAi} />
        <Stack.Screen
          name={NavRoutes.AnimatedAccrodion}
          component={AnimatedAccordion}
        />
        <Stack.Screen
          name={NavRoutes.ImageEditing}
          component={ImageEditing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={NavRoutes.TodoApp} component={TodoApp} />
        <Stack.Screen name={NavRoutes.TodoDetail} component={TodoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
