import React, { useState } from 'react'
import {View, Image as RNImage, ImageBackground, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Icon, Button } from '@ui-kitten/components'
import { Image } from "react-native-expo-image-cache";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigation } from '@react-navigation/native';

import { Images } from '../../assets/images'
import layouts from '../../constants/layouts'
import {getImageUrl} from '../../utils'
import {base_url} from '../../constants/'
import {likePost} from '../../api/posts'
import Text, {Muted} from '../typography';

dayjs.extend(relativeTime)

const Container = styled(View)`
  ${p => !p.standalone && `margin-top: 10px;
  margin-bottom: 30px;`}
  ${p => !p.standalone && `flex-direction: column-reverse`};
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

const StarIcon = (props, is_liked) => {
  return (<Icon {...props} name={is_liked ? 'star' : 'star-outline'}/>
)};

const Post = props => {
  const [liked, setLiked] = useState(props.is_liked)

  const {url, width, height} = props.clean_image_medium
  const {avatar, name, location} = props.user_info
  const navigation = useNavigation();

  const handleLike = () => {
    setLiked(!liked)
    likePost(props.id)
  }

  return (
    <Container
      standalone={props.standalone}
      // nopadding={true}
    >
      <PostImageWrapper
        activeOpacity={1}
        as={props.standalone ? View : TouchableOpacity}
        onPress={() => navigation.navigate('post', {
          tag: props.tag,
          id: props.id,
          _back: 'Home',
        })}
      >
        {/* <PostImage uri={props.image_medium}/> */}
        <PostImage
          source={{uri: getImageUrl(url)}}
          ratio={height / width}
          resizeMode='cover'
          padding={props.standalone ? 0 : 20}
          imageStyle={{
            borderRadius: props.standalone ? 0 : 15,
          }}
        >
          {props.standalone && !props.is_mine && <Button appearance='ghost' status='danger'
            size='large'
            style={{
              width: 40,
              height: 40,
              alignSelf: 'flex-end',
              margin: 10,
            }}
            onPress={handleLike}
            accessoryLeft={(p) => StarIcon(p, liked)}/>
          }
        </PostImage>
      </PostImageWrapper>
      <PostHeader
        standalone={props.standalone}
      >
        <TouchableOpacity onPress={() => !props.is_mine ? navigation.navigate('others-profile', {id: props.user}) : navigation.navigate('Profile')}>
          <Avatar size='medium' source={{uri: getImageUrl(avatar)}}/>
        </TouchableOpacity>
        <NameAndLocationWrapper>
          <View>
            <Name>{name}</Name>
            <Location>{location}</Location>
          </View>
          <Text
            category='label'
            style={{
              color: '#888',
              alignSelf: !props.standalone ? 'flex-end' : 'flex-start',
          }}>{dayjs(props.created_at).fromNow()}</Text>
        </NameAndLocationWrapper>
      </PostHeader>
    </Container>
  )
}

export default Post
