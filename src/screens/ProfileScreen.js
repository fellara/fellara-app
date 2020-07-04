import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components'

import Form from '../components/forms'
import Container from '../components/layouts';
import Text, { Header, Subheader } from '../components/typography';
import LoginScreen from './auth/LoginScreen';


const ProfileScreen = props => {
  return (
    <Container as={ScrollView}>
      <LoginScreen />
    </Container>
  )
}

export default ProfileScreen
