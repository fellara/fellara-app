import React, {useState} from 'react';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components/native'
import {connect} from 'react-redux'

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Heading, Subheading } from '../../components/typography';
import {login, getProfile} from '../../api/user'
import {setToken, setProfile} from '../../actions/user'
import { Button, Layout } from '@ui-kitten/components';

const fields = [
  {
    label: 'Email',
    placeholder: 'jackwhite@example.com',
    type: 'text',
    name: 'email',
    required: true,
  }, 
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    required: true,
  },

]

const LoginScreen = props => {
  const [loading, setLoading] = useState(false)
  const handleSubmit = (data) => {
    setLoading(true)
    login(data).then(res => {
      props.setToken(res.data.key)
      getProfile().then(res => {
        props.setProfile(res.data)
        setLoading(false)
      })
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <Layout>
    <Container as={ScrollView}>
      <Heading>Login</Heading>
      <Subheading marginbottom>Login to get more of Fellas stuff!</Subheading>
      <Form 
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <Button style={{marginTop: 20}} appearance='ghost' status='primary'
        onPress={() => props.navigation.navigate('register')}
      >
        Not registered yet? Join now!
      </Button>
    </Container>
    </Layout>
  );
}

export default connect(null, {setToken, setProfile})(LoginScreen)
