import React from 'react';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components'

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Header, Subheader } from '../../components/typography';
import {login} from '../../api/auth'
 
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

const LoginScreen = props => {
  const handleSubmit = (data) => {
    login(data).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <Container as={ScrollView}>
      <Header>Login</Header>
      <Subheader marginBottom>Login to get more of Fellas stuff!</Subheader>
      <Form 
        fields={fields}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default LoginScreen
