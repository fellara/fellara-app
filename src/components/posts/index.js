import React from 'react'
import {View, Image as RNImage} from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Layout } from '@ui-kitten/components'
import { Image } from "react-native-expo-image-cache";

import { Images } from '../../assets/images'
import layouts from '../../constants/layouts'
import {base_url} from '../../constants/'
import Text, {Muted} from '../typography';


const Container = styled(View)`
  margin-top: 10px;
  margin-bottom: 30px;
`
const PostHeader = styled(View)`
  height: 50px;
  align-items: center;
  flex-direction: row
`
const PostImageWrapper = styled(View)`
  margin-top: 5px;
  justify-content: center;
  align-items: center;
`
const PostImage = styled(RNImage)`
  width: ${layouts.window.width - 20}px;
  height: ${p => (layouts.window.width - 20) * p.ratio}px;
  border-radius: 15px;
`

const NameAndLocationWrapper = styled(View)`
  flex-direction: column;
  margin-left: 10px;
`

const Name = styled(Text)`

`
const Location = styled(Muted)`

`

const Post = props => {
  const {url, width, height} = props.clean_image_medium
  const {avatar, name, location} = props.user_info
  
  return (
    <Container>
      <PostHeader>
        <Avatar size='medium' source={{uri: base_url + avatar}}/>
        <NameAndLocationWrapper>
          <Name>{name}</Name>
          <Location>{location}</Location>
        </NameAndLocationWrapper>
      </PostHeader>
      <PostImageWrapper>
        {/* <PostImage uri={props.image_medium}/> */}
        <PostImage source={{uri: base_url + url}} ratio={height / width} resizeMode='cover' />
      </PostImageWrapper>
    </Container>
  )
}

export default Post
