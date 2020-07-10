import React, {useState} from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { Button, Layout } from '@ui-kitten/components';

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Heading, Subheading } from '../../components/typography';
import {login, getProfile} from '../../api/user'
import {setToken, setProfile} from '../../actions/user'
import layouts from '../../constants/layouts'

const StyledLayout = styled(Layout)`
`

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
    <StyledLayout
      style={{height: layouts.window.height}}
    >
      <SafeAreaView style={{
        flex: 1,
      }}>
        <Container as={ScrollView}>
          <Heading>Login</Heading>
          <Subheading marginbottom>{!props._back ? 'Login to get more of Fellas stuff!' : 'In order to move further you need to login first.'}</Subheading>
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            loading={loading}
          />

          <Button style={{marginTop: 20}} appearance='ghost' status='primary'
            onPress={() => props.navigation.navigate('register', {_back: props._back})}
          >
            Not registered yet? Join now!
          </Button>
        </Container>
      </SafeAreaView>
    </StyledLayout>
  );
}

export default connect(null, {setToken, setProfile})(LoginScreen)
