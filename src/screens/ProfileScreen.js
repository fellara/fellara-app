import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components'

import Form from '../components/forms'
import Container from '../components/layouts';
import Text, { Header, Subheader } from '../components/typography';


const ProfileScreen = props => {
  return (
    <Container as={ScrollView}>
      <Text>this is profile screen</Text>
    </Container>
  )
}

export default ProfileScreen
