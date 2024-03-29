import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux'
import * as eva from '@eva-design/eva';
import { ApplicationProvider as UIProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeProvider } from 'styled-components'

import {theme} from './theme'
import {store} from './src/store'
import useCachedResources from './src/hooks/useCachedResources';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import LinkingConfiguration from './src/navigation/LinkingConfiguration';
import Toast from './src/components/toasts';
import { getInitals } from './src/actions';
import MusicButton from './src/components/musics/MusicButton';
import A2HS from './src/components/a2hs';

const Stack = createStackNavigator();

console.disableYellowBox = true

export default function App(props) {
  const [loading, setLoading] = useState(true)
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    store.dispatch(getInitals())
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <UIProvider {...eva} theme={{...eva.light, ...theme}}>
          <IconRegistry icons={EvaIconsPack} />
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <NavigationContainer linking={LinkingConfiguration}>
              <Stack.Navigator headerMode='none'>
                <Stack.Screen name="Root" component={MainNavigator} />
              </Stack.Navigator>
              <MusicButton />
              <A2HS />
            </NavigationContainer>
          </View>
          <Toast />
        </UIProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
