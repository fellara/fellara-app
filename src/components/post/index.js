import React from 'react'
import {View, Image} from 'react-native'
import styled from 'styled-components'
import { Avatar, Layout } from '@ui-kitten/components'

const Container = styled(View)`

`

const Post = props => {

  return (
    <Container>
      <Avatar shape='round' source={require('../../assets/images/logo.jpg')}/>

    </Container>
  )
}

export default Post
