import React, { useState, useEffect } from 'react'
import {View, Image as RNImage, ImageBackground, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { Avatar, Icon, Button } from '@ui-kitten/components'
import { Image } from "react-native-expo-image-cache";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMediaQuery } from 'react-responsive'

import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'
import {getImageUrl} from '../../utils'
import {likePost} from '../../api/posts'
import Text, {Muted} from '../typography';
import { makeToast } from '../../actions/toasts'

dayjs.extend(relativeTime)

const Container = styled(View)`
  ${p => !p.standalone && `margin-top: 10px;
  margin-bottom: 30px;`}
  ${p => !p.standalone && `flex-direction: column-reverse`};
  align-items: center;
`
const PostHeader = styled(View)`
  width: ${p => !p.isDesktop ? `100%` : MAX_WIDTH + `px`};
  height: 50px;
  align-items: center;
  flex-direction: row;
  ${p => p.standalone && `padding: 0 10px;`}
`
const PostImageWrapper = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`
const PostImage = styled(ImageBackground)`
  width: ${p => !p.isDesktop ? layouts.window.width - p.padding : MAX_WIDTH}px;
  height: ${p => (!p.isDesktop ? layouts.window.width - p.padding : MAX_WIDTH) * p.ratio}px;
  border-radius: 15px;
`

const NameAndLocationWrapper = styled(View)`
  flex-direction: row;
  margin-left: 10px;
  justify-content: space-between;
  flex: 1;
  align-items: ${p => p.standalone ? 'flex-start' : `flex-end`};
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
  const route = useRoute();

  let action = null;
  if (route?.params) action = route.params.action;
  const tag = props.tags.find(t => t.id === parseInt(props.tag))

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  useEffect(() => { 
    switch (action) {
      case 'LIKE':
        handleLike();
        break;
    
      default:
        break;
    }
  }, [action])

  const handleLike = () => {
    if (props.isLoggedIn) {
      setLiked(!liked)
      likePost(props.id)
    } else {
      props.makeToast('Login is required')
      navigation.navigate('Profile', {_back: 'post', id: props.id, tag: props.tag, action: 'LIKE'})
    }
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
          isDesktop={isDesktopOrLaptop}
          source={{uri: getImageUrl(url)}}
          ratio={height / width}
          resizeMode='cover'
          padding={props.standalone ? 0 : POSTS_LIST_PADDING}
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
        isDesktop={isDesktopOrLaptop}
      >
        <TouchableOpacity onPress={() => !props.is_mine ? navigation.navigate('others-profile', {id: props.user}) : navigation.navigate('Profile')}>
          <Avatar size='medium' source={{uri: getImageUrl(avatar)}}/>
        </TouchableOpacity>
        <NameAndLocationWrapper
          standalone={props.standalone}
        >
          <View>
            <Name>{name}</Name>
            <Location>{location}</Location>
          </View>
          <View
            style={{
              alignItems: 'flex-end'
            }}
          >
            {props.showTag && <Text
              category='label'
            >{tag ? 'From ' + tag.title : ''}</Text>}
            <Text
              category='label'
              style={{
                color: '#888',
            }}>{dayjs(props.created_at).fromNow()}</Text>
          </View>
        </NameAndLocationWrapper>
      </PostHeader>
    </Container>
  )
}

export default connect(state => ({
  tags: state.initials.tags,
  isLoggedIn: state.user.isLoggedIn
}), {
  makeToast,
})(Post)
