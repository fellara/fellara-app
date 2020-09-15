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
import { Video } from 'expo-av'

import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'
import {IMAGE, VIDEO} from '../../constants'
import {getFileUrl} from '../../utils'
import {likePost} from '../../api/posts'
import Text, {Muted} from '../typography';
import { makeToast } from '../../actions/toasts'
import {theme} from '../../../theme'

dayjs.extend(relativeTime)

const Container = styled(View)`
  ${p => !p.standalone && `
    margin-top: 10px;
    margin-bottom: 30px;
  `}
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
  return (<Icon {...props} name={is_liked ? 'star' : 'star-outline'} style={{
    ...props.style,
    width: 40,
    height: 40,
  }} />
)};

const Post = props => {
  const [liked, setLiked] = useState(props.is_liked)

  const navigation = useNavigation();
  const route = useRoute();

  let action = null;
  if (route?.params) action = route.params.action;
  const tag = props.tags.find(t => t.id === parseInt(props.tag_new))

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
      if (!liked) props.makeToast('Profile -> Menu -> Starreds', 'SUCCESS')
      else props.makeToast('Post removed from Starreds', 'SUCCESS')
    } else {
      props.makeToast('Login is required')
      navigation.navigate('Profile', {_back: 'post', id: props.id, tag: props.tag_new, action: 'LIKE'})
    }
  }

  const handleAvatarPress = () => {
    if (!props.is_mine) {
      navigation.navigate('others-profile', {id: props.user}) 
    } else {
      navigation.navigate('Profile')
    } 
  }

  return (
    <PostTemplate 
      {...props} 
      onPress={() => navigation.navigate('post', {
        tag: props.tag_new,
        id: props.id,
        _back: 'Home',
      })}
      onAvatarPress={handleAvatarPress}
      onLike={handleLike}
      liked={liked}
    />
  )
}


export const PostTemplate = props => {
  const playRef = React.useRef();

  React.useEffect(() => {
    playRef.current?.startAnimation();
  }, []);

  const {url, width, height} = props.clean_image_medium
  const {avatar, name, location} = props.user_info

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  let tag = null
  tag = props.tags?.find(t => t.id === parseInt(props.tag_new))

  const isImage = (props.type === '' || props.type === IMAGE) || !props.standalone
  const imageVideoProps = isImage ? {ratio: height / width} : {}
  const style = !props.standalone && props.type === VIDEO ? {
    style: {
      alignItems: 'center',
      justifyContent: 'center',
    }
  } : {}

  return (<Container
    standalone={props.standalone}
    // nopadding={true}
  >
    <PostImageWrapper
      activeOpacity={1}
      as={props.standalone ? View : TouchableOpacity}
      onPress={props.onPress}
    >
      {/* <PostImage uri={props.image_medium}/> */}
      <PostImage
        as={isImage ? ImageBackground : Video}
        isDesktop={isDesktopOrLaptop}
        source={{uri: isImage ? getFileUrl(url) : props.file}}
        resizeMode='cover'
        padding={props.standalone ? 0 : POSTS_LIST_PADDING}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        shouldPlay
        isLooping
        imageStyle={{
          borderRadius: props.standalone ? 0 : 15,
        }}
        ratio={height / width}
        {...style}
        // {...imageVideoProps}
      >
        {props.standalone && !props.is_mine && <Button 
          appearance='ghost' 
          status='danger'
          size='large'
          style={{
            width: 30,
            height: 30,
            alignSelf: 'flex-end',
            margin: 10,
            backgroundColor: '#fff5',
          }}
          onPress={props.onLike}
          accessoryLeft={(p) => StarIcon(p, props.liked)}/>
        }
        {
          !props.standalone && props.type === VIDEO && <View style={{
            width: 80, height: 80, 
            margin: 5,
            // flexDirection: 'row'
          }}>
            <Icon name='arrow-right' 
              animation='pulse'
              ref={playRef}
              animationConfig={{ cycles: Infinity }}
              style={{ 
                // width: 40, height: 60, 
                tintColor: 'rgba(34, 43, 69, 0.9)',
                // alignSelf: 'center',
                // justifySelf: 'center',
              }} />
              {/* <Muted>Play</Muted> */}
          </View>
        }
      </PostImage>
    </PostImageWrapper>
    <PostHeader
      standalone={props.standalone}
      isDesktop={isDesktopOrLaptop}
    >
      <TouchableOpacity onPress={props.onAvatarPress}>
        <Avatar size='medium' source={{uri: getFileUrl(avatar)}}/>
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
          >{props.tag ? 'From ' + props.tag.title : ''}</Text>}
          <Text
            category='label'
            style={{
              color: '#888',
          }}>{dayjs(props.created_at).fromNow()}</Text>
        </View>
      </NameAndLocationWrapper>
    </PostHeader>
  </Container>
)}

export default connect(state => ({
  tags: state.initials.tags,
  isLoggedIn: state.user.isLoggedIn
}), {
  makeToast,
})(Post)
