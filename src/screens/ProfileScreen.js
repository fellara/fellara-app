import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'

import Form from '../components/forms'
import Container from '../components/layouts';
import Text, { Heading, Subheading } from '../components/typography';
import AuthScreen from '../navigation/AuthNavigator';
import { Avatar, Button } from '@ui-kitten/components';
import { logout } from '../api/user';
import { logoutUser } from '../actions/user';

const Header = styled(View)`
  align-items: center;
`

const ProfileScreen = ({isLoggedIn, profile, ...props}) => {
  const handleLogout = () => {
    props.logoutUser()
    logout()
  }

  if (!isLoggedIn) return <AuthScreen />;

  return (
    <Container as={ScrollView} center>
      <Header>
        <Avatar size='giant' source={profile.profile_image} style={{'width': 100, 'height': 100, 'marginBottom': 10}} />
        <Heading>{profile.first_name + ' ' + profile.last_name}</Heading>
        <Subheading marginbottom>{profile.city + ', ' + profile.country}</Subheading>
      </Header>

      <Button appearance='ghost' status='primary'
        onPress={handleLogout}
      >
        Exit
      </Button>
    </Container>
  )
}

export default connect(state => ({isLoggedIn: state.user.isLoggedIn, profile: state.user}), {
  logoutUser
})(ProfileScreen)
