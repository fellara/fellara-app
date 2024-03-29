import React, {useState} from 'react';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import {connect} from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Heading, Subheading } from '../../components/typography';
import {login, getProfile, register, getCountries, getCities} from '../../api/user'
import {setToken, setProfile} from '../../actions/user'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'
import TopNavigation from '../../components/layouts/TopNavigation'
import { makeToast } from '../../actions/toasts'

const fields = [
  {
    label: 'Avatar',
    type: 'image',
    name: 'profile_image',
    required: true,
  },
  {
    label: 'First Name',
    placeholder: 'John',
    type: 'text',
    name: 'first_name',
    required: true,
  },
  {
    label: 'Last Name',
    placeholder: 'White',
    type: 'text',
    name: 'last_name',
    required: true,
  },
  {
    label: 'Country',
    placeholder: 'United States',
    type: 'autocomplete',
    name: 'country',
    loadOptions: getCountries,
    required: true,
  },
  {
    label: 'City',
    placeholder: 'NYC',
    type: 'autocomplete',
    name: 'city',
    preventPreload: (data) => {
      if (!data.country) return true;
    },
    loadOptions: (query, data) => getCities(query, data.country),
    disabled: (data) => !data.country,
    selectTextOnFocus: false,
    // disabled: (data) => data.country,
    required: true,
  },
  {
    label: 'Email',
    placeholder: 'jackwhite@example.com',
    regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    type: 'text',
    name: 'email',
    required: true,
    autoCapitalize: 'none',
  },
  {
    label: 'Gender',
    type: 'select',
    name: 'gender',
    default: 4,
    options: [
      {title: 'Male', value: 1},
      {title: 'Female', value: 2},
      {title: 'Non-Binary', value: 3},
      {title: 'Prefer Not to Disclose', value: 4},
    ]
  },
  {
    label: 'Birth Date',
    placeholder: 'Pick Date',
    type: 'date',
    name: 'date_of_birth'
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password1',
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
    regexError: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
    validator: (data) => {
      if (data.password1 === data.password2) return true
    },
    validatorError: 'Password and confirm password must be the same.',
    required: true,
    autoCapitalize: 'none',
  },
  {
    label: 'Confirm Password',
    type: 'password',
    name: 'password2',
    required: true,
    autoCapitalize: 'none',
  }
]

const RegisterScreen = props => {
  const [loading, setLoading] = useState(false)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const style = isDesktopOrLaptop ? {
      width: MAX_WIDTH
  } : {}

  const handleSubmit = (data) => {
    setLoading(true)
    register(data).then(res => {
      if (res.status < 300) {
        props.setToken(res.data.key)
        props.makeToast('Registered successfully', 'SUCCESS')
        getProfile().then(res => {
          props.setProfile(res.data)
        })
      } else if (res.status < 500) {
        props.makeToast(res.data.detail, 'ERROR')
      } else {
        props.makeToast('Something went wrong, try again', 'ERROR')
      }
      setLoading(false)
    }).catch(err => {
      console.log(err);
      setLoading(false)
    })
  }
  return (
    <SafeAreaView>
      <TopNavigation
        title={'Register'}
        onBack={() => props.navigation.goBack()}
      />
        <Layout
          style={{height: layouts.window.height,
            alignItems: 'center',
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            enabled={true}
            style={{flex: 1}}
          >
            <Container
              as={ScrollView}
              contentContainerStyle={{
                paddingBottom: 180,
                ...style
              }}
            >
              <Heading>Registration</Heading>
              <Subheading marginbottom>It took you less than a minute! But helps the others get to know you, your culture and your people.</Subheading>
              <Form
                fields={fields}
                onSubmit={handleSubmit}
                loading={loading}
              />
              <Button
                style={{marginTop: 20}}
                appearance='ghost'
                status='primary'
                onPress={() => props.navigation.goBack()}
              >
                Already registered? Login then!
              </Button>
            </Container>
          </KeyboardAvoidingView>
        </Layout>
    </SafeAreaView>
  )
}

export default connect(null, {setToken, setProfile, makeToast})(RegisterScreen)
