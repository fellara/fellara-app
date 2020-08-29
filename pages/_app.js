import React from 'react';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import { ApplicationProvider as UIProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native';

import {store as reduxStore} from '../src/store';
import {theme} from '../theme'


const MyApp = ({Component, pageProps}) => (
  <ThemeProvider theme={theme}>
    <UIProvider {...eva} theme={{...eva.light, ...theme}}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Component {...pageProps} />
      </NavigationContainer>
    </UIProvider>
  </ThemeProvider>
);

const makeStore = () => reduxStore;
const wrapper = createWrapper(makeStore, {debug: true});

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);