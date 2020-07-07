import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { BottomNavigation, BottomNavigationTab, Layout, Icon } from '@ui-kitten/components';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const tabs = [
  {
    name: 'Home',
    icon: 'globe-2'
  },
  {
    name: 'AddPost',
    icon: 'camera-2'
  },
  {
    name: 'Profile',
    icon: 'person-2'
  },
]

const renderIcon = (props, icon, active) => {
  let name = icon
  if (!active) name += '-outline'

  return (
    <Icon {...props} name={name} />
  )
}

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    appearance='noIndicator'
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={(props) => renderIcon(props, 'globe-2', state.index === 0)} />
    <BottomNavigationTab icon={(props) => renderIcon(props, 'camera', state.index === 1)} />
    <BottomNavigationTab icon={(props) => renderIcon(props, 'person', state.index === 2)} />
  </BottomNavigation>
);

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
      tabBar={props => <BottomTabBar {...props} />}
      tabBarOptions={{
        showLabel: false
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
        }}
      />
      <BottomTab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          title: 'AddPost',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="pluscircleo" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
        }}
      />
    </BottomTab.Navigator>
  );
}