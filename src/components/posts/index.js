import React from 'react'
import {View, Image as RNImage} from 'react-native'
import styled from 'styled-components'
import { Avatar, Layout } from '@ui-kitten/components'
import { Image } from "react-native-expo-image-cache";

import { Colors } from '../../assets/utils/Colors'
import { Images } from '../../assets/images'
import {base_url} from '../../constants/'
import Text from '../typography';


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
  margin-top: 10px;
  height: 450px;
  justify-content: center;
  align-items: center;
`
const PostImage = styled(RNImage)`
  width: 100%;
  height: 100%;
  border-radius: 15px;

`

const NameAndLocationWrapper = styled(View)`
  flex-direction: column;
  margin-left: 10
`

const Name = styled(Text)`

`
const Location = styled(Text)`

`

const Post = props => {
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
        {/* <PostImage uri={props.image_medium}/> */}
        <PostImage source={{uri: props.image_medium}}/>
      </PostImageWrapper>
    </Container>
  )
}

export default Post
