import React, {useState} from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { Button, Layout } from '@ui-kitten/components';
import { useMediaQuery } from 'react-responsive'

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Heading, Subheading } from '../../components/typography';
import {login, getProfile} from '../../api/user'
import {setToken, setProfile} from '../../actions/user'
import { makeToast } from '../../actions/toasts'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'

const StyledLayout = styled(Layout)`
`

const fields = [
  {
    label: 'Email',
    placeholder: 'jackwhite@example.com',
    type: 'text',
    regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    name: 'email',
    required: true,
    autoCapitalize: 'none',
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    required: true,
    autoCapitalize: 'none',
  }
]

const LoginScreen = props => {
  const [loading, setLoading] = useState(false)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const style = isDesktopOrLaptop ? {
      width: MAX_WIDTH
  } : {}

  const handleSubmit = (data) => {
    setLoading(true)
    login(data).then(res => {
      if (res.status < 300) {
        props.setToken(res.data.key)
        props.makeToast('Logged in successfully', 'SUCCESS')
        getProfile().then(res => {
          props.setProfile(res.data)
        })
      } else if (res.status < 500) {
        props.makeToast('Wrong credentials', 'ERROR')
      } else {
        props.makeToast('Something went wrong, try again', 'ERROR')
      }
      setLoading(false)
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <StyledLayout
      style={{
        height: layouts.window.height,
        alignItems: 'center',
      }}
    >
      <SafeAreaView style={{
        flex: 1,
        ...style
      }}>
        <Container as={ScrollView}>
          <Heading>Login</Heading>
          <Subheading marginbottom>{!props._back ? 'Login to get more of fellara!' : 'In order to move further you need to login first.'}</Subheading>
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
          <Button style={{marginTop: 0}} appearance='ghost' status='primary'
            onPress={() => props.navigation.navigate('forget-register', {_back: props._back})}
          >
            Forgot your password? Recover it!
          </Button>
        </Container>
      </SafeAreaView>
    </StyledLayout>
  );
}

export default connect(null, {setToken, setProfile, makeToast})(LoginScreen)
