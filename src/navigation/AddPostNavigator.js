import React from 'react'
import {Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { TopNavigationAction, Layout } from '@ui-kitten/components';

import AddPostScreen from '../screens/add-post';
import PublishPostScreen from '../screens/add-post/PublishPostScreen';
import TopNavigation from '../components/layouts/TopNavigation';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName='take-pick-photo'
      headerMode='screen'
      screenOptions={{
        header: ({ scene, previous, navigation }) => <TopNavigation />,
      }}
    >
      <Stack.Screen name="add-post" component={AddPostScreen} />
      <Stack.Screen name="publish-post" component={PublishPostScreen} />
    </Stack.Navigator>
  );
}