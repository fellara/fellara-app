import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import styled from 'styled-components'

import Form from '../components/forms'
import Container from '../components/layouts';
import Text, { Header, Subheader } from '../components/typography';

const fields = [
  {
    label: 'Email',
    placeholder: 'jackwhite@example.com',
    type: 'text',
    name: 'email'
  }, 
  {
    label: 'Password',
    type: 'password',
    name: 'password'
  },

]

export default function ProfileScreen() {
  return (
    <Container as={ScrollView}>
      <Header>Login</Header>
      <Subheader marginBottom>Login to get more of Fellas stuff!</Subheader>
      <Form 
        fields={fields}
      />
    </Container>
  );
}
