import React from 'react'
import {View, Image} from 'react-native'
import styled from 'styled-components'
import { Avatar, Layout } from '@ui-kitten/components'
import { Colors } from '../../assets/utils/Colors'
import { Images } from '../../assets/images'

import { MonoText } from '../StyledText';


const Container = styled(View)`
  height: 550;
  padding-left: 10;
  padding-right: 10;
  margin-top: 10;
  /* background: red */
`
const PostHeader = styled(View)`
  height: 50;
  align-items: center;
  flex-direction: row
`
const PostImageWrapper = styled(View)`
  /* background-color: yellow; */
  height: 450;
  justify-content: center;
  align-items: center;
`
const PostImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 15

`

const NameAndLocationWrapper = styled(View)`
  flex-direction: column;
  margin-left: 10
`

const Name = styled(MonoText)`

`
const Location = styled(MonoText)`

`




const Post = props => {

  return (
    <Container>
      <PostHeader>
        <Avatar size='large' source={Images.logo}/>
        <NameAndLocationWrapper>
          <Name>Mohamad Bozorgi</Name>
          <Location>some where</Location>
        </NameAndLocationWrapper>
      </PostHeader>
      <PostImageWrapper>
        <PostImage source={Images.fall}/>
      </PostImageWrapper>
    </Container>
  )
}

export default Post

// <Avatar shape='round' source={require('../../assets/images/logo.jpg')}/>
