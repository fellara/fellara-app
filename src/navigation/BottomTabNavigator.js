import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native'
import { BottomNavigation, BottomNavigationTab, Layout, Icon } from '@ui-kitten/components';
import { useMediaQuery } from 'react-responsive'

import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../constants/layouts'
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddPostScreen from '../screens/add-post';
import ProfileScreen from '../screens/profile/ProfileScreen';

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
  let style = active ? {
    ...props.style,
    tintColor: '#222'
  } : {
    ...props.style,
    tintColor: '#999'
  }
  return (
    <Icon style={{
      ...style
    }} name={name} />
  )
}

const BottomTabBar = ({ navigation, state }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const style = isDesktopOrLaptop ? {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: (layouts.window.width - MAX_WIDTH) / 2 - POSTS_LIST_PADDING
  } : {}

  return (<BottomNavigation
    selectedIndex={state.index}
    appearance='noIndicator'
    onSelect={index => navigation.navigate(state.routeNames[index])}
    style={{
      ...style
    }}
  >
      <BottomNavigationTab icon={(props) => renderIcon(props, 'globe-2', state.index === 0)} />
      <BottomNavigationTab icon={(props) => renderIcon(props, 'camera', state.index === 1)} />
      <BottomNavigationTab icon={(props) => renderIcon(props, 'person', state.index === 2)} />
  </BottomNavigation>
)};

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
          title: 'Home',
        }}
      />
      <BottomTab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          title: 'Publish Post',
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </BottomTab.Navigator>
  );
}