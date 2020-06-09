import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import HomeScreen from './src/screens/HomeScreen'
import useCachedResources from './src/hooks/useCachedResources';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import LinkingConfiguration from './src/navigation/LinkingConfiguration';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './src/reducers'


const store = createStore(rootReducer)
const Stack = createStackNavigator()
console.disableYellowBox = true


 const App = (props) => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <Text>not finished</Text>;
  } else {
    return (
      <Provider store={store}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <BottomTabNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App
