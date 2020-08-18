import React, {useState} from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { Button, Layout } from '@ui-kitten/components';

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Heading, Subheading } from '../../components/typography';
import {resetPassword, resetPasswordConfirm} from '../../api/user'
import {setToken, setProfile} from '../../actions/user'
import layouts from '../../constants/layouts'
import TopNavigation from '../../components/layouts/TopNavigation'
import { makeToast } from '../../actions/toasts'

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
]

const ForgetPasswordScreen = props => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (data) => {
    setLoading(true)
    resetPassword(data).then(res => {
      if (res.status <= 299) {
        props.makeToast(res.data.detail, 'SUCCESS')
      } else {
        props.makeToast(res.data.email, 'ERROR')
      }
      setLoading(false)
    }).catch(err => {
      props.makeToast('Some error happend!', 'ERROR')
      setLoading(false)
    })
  }
  return (
      <SafeAreaView>
        <TopNavigation
          title={'Recover Password'}
          onBack={() => props.navigation.goBack()}
        />
        <StyledLayout
          style={{height: layouts.window.height}}
        >
          <Container as={ScrollView}>
            <Heading>Forget Password</Heading>
            <Subheading marginbottom>{'Enter the email address that you registered with to recover your password.'}</Subheading>
            <Form
              fields={fields}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </Container>
        </StyledLayout>
    </SafeAreaView>
  )
}

export default connect(null, {
  makeToast
})(ForgetPasswordScreen)
