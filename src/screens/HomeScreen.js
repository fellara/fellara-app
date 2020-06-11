import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components'
import { Layout, Text } from '@ui-kitten/components';

import { MonoText } from '../components/StyledText';
import Post from '../components/post';

const Container = styled(View)`

`
 const HomeScreen = props => {
  return (
    <Layout>
      {
        posts.map((post, index) => <Post key={post.id || index} {...post} />)
      }
    </Layout>
  )
}

HomeScreen.navigationOptions = {
  header: null,
}

const posts = [
  {
    user: {
      name: '',
      region: '',
      image: ''
    },
    image: '',
  }
]

export default HomeScreen
