import React from 'react'
import {Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

export default (props) => {
  return (
    <Stack.Navigator
      initialRouteName='register'
      screenOptions={{
        header: () => (
          <Layout level='1'>
            {/* <TopNavigation
              alignment='center'
              title='Eva Application'
              subtitle='Subtitle'
              // accessoryLeft={renderBackAction}
              // accessoryRight={renderRightActions}
            /> */}
            {/* <Image
              style={{ width: 45, height: 45 }}
              source={require('../assets/images/logo.jpg')}
            /> */}
          </Layout>
        ),
        headerLeft: null,
        headerTitle: () => (
          <Image
            style={{ width: 45, height: 45 }}
            source={require('../assets/images/logo.jpg')}
          />
        )
      }}
    >
      <Stack.Screen name="login">
        {p => <LoginScreen {...p} {...props} />}
      </Stack.Screen>
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}