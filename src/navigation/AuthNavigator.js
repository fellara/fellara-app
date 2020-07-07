import React from 'react'
import {Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName='register'
      screenOptions={{
        headerLeft: null,
        headerTitle: () => (
          <Image
            style={{ width: 45, height: 45 }}
            source={require('../assets/images/logo.jpg')}
          />
        )
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}