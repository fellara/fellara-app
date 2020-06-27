import React from 'react'
import {View, Image} from 'react-native'
import styled from 'styled-components'
import { Avatar, Layout } from '@ui-kitten/components'

import { Colors } from '../../assets/utils/Colors'
import { Images } from '../../assets/images'
import {base_url} from '../../constants/'
import { MonoText } from '../StyledText';


const Container = styled(View)`
  height: 550px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
`
const PostHeader = styled(View)`
  height: 50px;
  align-items: center;
  flex-direction: row
`
const PostImageWrapper = styled(View)`
  height: 450px;
  justify-content: center;
  align-items: center;
`
const PostImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 15px;

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
  console.log('hey', props);
  
  return (
    <Container>
      <PostHeader>
        <Avatar size='large' source={{uri: base_url + props.user_info?.avatar}}/>
        <NameAndLocationWrapper>
          <Name>{props.user_info?.name}</Name>
          <Location>{props.user_info?.location}</Location>
        </NameAndLocationWrapper>
      </PostHeader>
      <PostImageWrapper>
        <PostImage source={{uri: props.image_medium}}/>
      </PostImageWrapper>
    </Container>
  )
}

export default Post
