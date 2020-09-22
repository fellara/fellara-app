import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';

import BottomTabNavigator from './BottomTabNavigator';
import PostScreen from '../screens/PostScreen';
import OthersProfileScreen from '../screens/OthersProfileScreen';
import LikedPostsScreen from '../screens/LikedPostsScreen';
import PublishPostScreen from '../screens/add-post/PublishPostScreen';

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
      <Stack.Screen name="add-post" component={PublishPostScreen} />
      <Stack.Screen name="others-profile" component={OthersProfileScreen} />
      <Stack.Screen name="liked-posts" component={LikedPostsScreen} />
      <Stack.Screen name="tabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}