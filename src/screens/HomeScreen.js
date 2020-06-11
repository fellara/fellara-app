import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components'

import { MonoText } from '../components/StyledText';

const Container = styled.View`

`
 const HomeScreen = props => {
  return (
    <Container>
    
    </Container>
  )
}

HomeScreen.navigationOptions = {
  header: null,
}

export default HomeScreen
