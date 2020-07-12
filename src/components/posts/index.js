import React from 'react'
import {View, Image as RNImage, ImageBackground} from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Icon } from '@ui-kitten/components'
import { Image } from "react-native-expo-image-cache";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { Images } from '../../assets/images'
import layouts from '../../constants/layouts'
import {base_url} from '../../constants/'
import Text, {Muted} from '../typography';

dayjs.extend(relativeTime)

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
const PostImage = styled(ImageBackground)`
  width: ${layouts.window.width - 20}px;
  height: ${p => (layouts.window.width - 20) * p.ratio}px;
  border-radius: 15px;
`

const NameAndLocationWrapper = styled(View)`
  flex-direction: row;
  margin-left: 10px;
  justify-content: space-between;
  flex: 1;
  align-items: flex-end;
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
          <View>
            <Name>{name}</Name>
            <Location>{location}</Location>
          </View>
          <Text 
            category='label'
            style={{
              color: '#888',
              alignSelf: 'flex-end',
          }}>{dayjs(props.created_at).fromNow()}</Text>
        </NameAndLocationWrapper>
      </PostHeader>
      <PostImageWrapper>
        {/* <PostImage uri={props.image_medium}/> */}
        <PostImage source={{uri: base_url + url}} ratio={height / width} resizeMode='cover'
          imageStyle={{
            borderRadius: 15,
          }}
        >
          {/* <Icon name='heart-outline' style={{
            width: 40,
            height: 40,
            padding: 10,
            alignSelf: 'flex-end',
            // position: 'absolute',
            // zIndex: 9999,
          }} /> */}

        </PostImage>
      </PostImageWrapper>
    </Container>
  )
}

export default Post
