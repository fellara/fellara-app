import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {  connect } from 'react-redux'

import { MonoText } from '../components/StyledText';

 function HomeScreen(props) {
   console.log(props.loading)
  return (
    <View>
      <Text>This is a tab bar. You can edit it in:</Text>
    </View>
  );
}
export default connect(state => ({loading: state.loading}))(HomeScreen)

HomeScreen.navigationOptions = {
  header: null,
};
