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
  ${p => !(p.standalone || p.reply) && `
    margin-top: 10px;
    margin-bottom: 30px;
  `}  
  ${p => p.reply && `
    margin-bottom: 20px;
  `}
  ${p => !(p.standalone || p.reply) && `flex-direction: column-reverse`};
  align-items: center;
`
const PostHeader = styled(View)`
  width: ${p => !p.isDesktop ? `100%` : MAX_WIDTH + `px`};
  height: 50px;
  align-items: center;
  flex-direction: ${p => true ? 'row' : 'row-reverse'};
  ${p => (p.standalone || (p.reply && p.isDesktop)) && `padding: 0 10px;`}
`
const PostImageWrapper = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`
const WidthWrapper = styled(View)`
  width: ${p => !p.isDesktop ? layouts.window.width - p.padding : MAX_WIDTH}px;
  height: ${p => (!p.isDesktop ? layouts.window.width - p.padding : MAX_WIDTH) * p.ratio}px;
`
const PostImage = styled(WidthWrapper)`
`

const RepliersReplyWrapper = styled(WidthWrapper)`
  flex-direction: row;
  justify-content: space-between;
  
`

const NameAndLocationWrapper = styled(View)`
  justify-content: space-between;
  flex: 1;
  align-items: ${p => (p.standalone || p.reply) ? 'flex-start' : `flex-end`};
  flex-direction: ${p => true ? 'row' : `row-reverse`};
  margin-${p => false ? 'right' : `left`}: 10px;
`

const Name = styled(Text)`
  text-align: ${p => true ? 'left' : `right`};

`
const Location = styled(Muted)`
  text-align: ${p => true ? 'left' : `right`};
`

const StarIcon = (props, is_liked) => {
  return (<Icon {...props} name={is_liked ? 'star' : 'star-outline'} style={{
    ...props.style,
    width: 35,
    height: 35,
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

const SRepliers = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5px;
  align-items: center;
  flex: 1;
`
const SReplyTo = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5px;
  align-items: center;
  background-color: #222; 
  padding: 3px;
  border-radius: 100px;
`
const SReplier = styled(Avatar)`
  margin-right: 5px;
`

const More = styled(Muted)`
  width: 32px;
  height: 32px;
  background: #eee;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Repliers = ({replies}) => {
  if (!replies) return null
  return (
    <SRepliers>
      {
        Array.from(replies).splice(0, 3).map(replier => <SReplier 
          size='small' source={{uri: getFileUrl(replier.user_info.avatar)}}
        />)
      }
      {(replies.length - 3) > 0 && <More>+{replies.length - 3}</More>}
    </SRepliers>
  )
}

const ReplyTo = (props) => {
  const navigation = useNavigation()
  if (!props.id) return null

  return (
    <SReplyTo style={{}}
      as={TouchableOpacity}
      onClick={() => navigation.navigate('post', {
        tag: props.tag,
        id: props.id,
      })}
    >
      <Avatar 
        size='small' source={{uri: getFileUrl(props.user_info.avatar)}}
      />
      <Icon name='corner-up-left-outline' style={{width: 25, height: 25, tintColor: '#fff', marginLeft: 5}}/>
    </SReplyTo>
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
    reply={props.reply}
    // nopadding={true}
  >
    {props.standalone && props.reply_to_expanded && <PostHeader
        standalone={props.standalone}
        reply={props.reply}
        isDesktop={isDesktopOrLaptop}
      >
        <Repliers replies={props.replies} />
        <ReplyTo {...props.reply_to_expanded} tag={props.tag_new} />
      </PostHeader>}
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
          backgroundColor: '#ccc',
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
      {!props.standalone && props.reply_to_expanded && <PostHeader
        standalone={props.standalone}
        reply={props.reply}
        isDesktop={isDesktopOrLaptop}
      >
        <Repliers replies={props.replies} />
        <ReplyTo {...props.reply_to_expanded} tag={props.tag_new} />
      </PostHeader>}
    </PostImageWrapper>
    <PostHeader
      standalone={props.standalone}
      reply={props.reply}
      isDesktop={isDesktopOrLaptop}
    >
      <TouchableOpacity onPress={props.onAvatarPress}>
        <Avatar 
          size='medium' 
          source={{uri: getFileUrl(avatar)}}
          style={{ backgroundColor: '#ccc', outline: (props.reply || props.standalone) ? '3px solid #fff' : 'none'}}
        />
      </TouchableOpacity>
      <NameAndLocationWrapper
        standalone={props.standalone}
        reply={props.reply}
      >
        <View>
          <Name reply={props.reply}>{name}</Name>
          <Location reply={props.reply}>{location}</Location>
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
          }}>{dayjs().diff(dayjs(props.created_at)) > 7 ? dayjs(props.created_at).format('MMM DD, YYYY') : dayjs(props.created_at).fromNow()}</Text>
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
