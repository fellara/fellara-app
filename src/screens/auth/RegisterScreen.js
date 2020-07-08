import React, {useState} from 'react';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components/native'
import { Button, Layout } from '@ui-kitten/components';
import {connect} from 'react-redux'

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Heading, Subheading } from '../../components/typography';
import {login, getProfile, register} from '../../api/user'
import {setToken, setProfile} from '../../actions/user'
import layouts from '../../constants/layouts'

const fields = [
  {
    label: 'Avatar',
    type: 'image',
    name: 'profile_image'
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
    label: 'Email',
    placeholder: 'jackwhite@example.com',
    type: 'text',
    name: 'email',
    required: true,
  }, 
  {
    label: 'City',
    placeholder: 'NYC',
    type: 'text',
    name: 'city',
    required: true,
  }, 
  {
    label: 'Country',
    placeholder: 'United States',
    type: 'text',
    name: 'country',
    required: true,
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
    required: true,
  },  
  {
    label: 'Confirm Password',
    type: 'password',
    name: 'password2',
    required: true,
  }
]

const RegisterScreen = props => {
  const [loading, setLoading] = useState(false)
  const handleSubmit = (data) => {
    setLoading(true)
    register(data).then(res => {
      props.setToken(res.data.key)
      getProfile().then(res => {
        props.setProfile(res.data)
        setLoading(false)
      })
    }).catch(err => {
      console.log(err);
      setLoading(false)
    })
  }
  return (
    <Layout
      style={{height: layouts.window.height}}
    >
      <Container as={ScrollView}
        paddingbottom
      >
        <Heading>Register</Heading>
        <Subheading marginbottom>It took you less than a minute! But helps the others get to know you, your culture and your people.</Subheading>
        <Form 
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <Button style={{marginTop: 20}} appearance='ghost' status='primary'
          onPress={() => props.navigation.navigate('login')}
        >
          Already registered? Login then!
        </Button>
      </Container>
    </Layout>
  );
}

export default connect(null, {setToken, setProfile})(RegisterScreen)
