import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';

import BottomTabNavigator from './BottomTabNavigator';
import PostScreen from '../screens/PostScreen';
import OthersProfileScreen from '../screens/OthersProfileScreen';

const Stack = createStackNavigator();

export default (props) => {
  return (
    <Stack.Navigator
      initialRouteName='tabs'
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="post" component={PostScreen} />
      <Stack.Screen name="others-profile" component={OthersProfileScreen} />
      <Stack.Screen name="tabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}