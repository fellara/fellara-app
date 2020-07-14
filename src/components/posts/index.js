import React from 'react'
import {View, Image as RNImage, ImageBackground, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Icon } from '@ui-kitten/components'
import { Image } from "react-native-expo-image-cache";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigation } from '@react-navigation/native';

import { Images } from '../../assets/images'
import layouts from '../../constants/layouts'
import {base_url} from '../../constants/'
import Text, {Muted} from '../typography';

dayjs.extend(relativeTime)

const Container = styled(View)`
  ${p => !p.standalone && `margin-top: 10px;
  margin-bottom: 30px;`}
`
const PostHeader = styled(View)`
  height: 50px;
  align-items: center;
  flex-direction: row
  ${p => p.standalone && `padding: 0 10px;`}
`
const PostImageWrapper = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`
const PostImage = styled(ImageBackground)`
  width: ${p => layouts.window.width - p.padding}px;
  height: ${p => (layouts.window.width - p.padding) * p.ratio}px;
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
  const navigation = useNavigation();
  
  return (
    <Container
      standalone={props.standalone}
      // nopadding={true}
    >
      <PostImageWrapper
        as={props.standalone ? View : TouchableOpacity}
        onPress={() => navigation.navigate('post', {
          name,
          location,
          avatar,
          url,
          width,
          height,
          tag: props.tag,
          id: props.id,
        })}
      >
        {/* <PostImage uri={props.image_medium}/> */}
        <PostImage 
          source={{uri: url.startsWith('http') ? url : base_url + url}} 
          ratio={height / width} 
          resizeMode='cover'
          padding={props.standalone ? 0 : 20}
          imageStyle={{
            borderRadius: props.standalone ? 0 : 15,
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
      <PostHeader
        standalone={props.standalone}
      >
        <Avatar size='medium' source={{uri: avatar.startsWith('http') ? avatar : base_url + avatar}}/>
        <NameAndLocationWrapper>
          <View>
            <Name>{name}</Name>
            <Location>{location}</Location>
          </View>
          <Text 
            category='label'
            style={{
              color: '#888',
              alignSelf: 'flex-start',
          }}>{dayjs(props.created_at).fromNow()}</Text>
        </NameAndLocationWrapper>
      </PostHeader>
    </Container>
  )
}

export default Post
