import React, {useEffect, useState} from 'react';
import { ScrollView, Clipboard, SafeAreaView, TouchableOpacity } from 'react-native'
import { Layout, Icon, MenuItem, OverflowMenu,
  TopNavigationAction } from '@ui-kitten/components';
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

import TopNavigation from '../components/layouts/TopNavigation'
import Post, {PostTemplate} from '../components/posts'
import PostsList from '../components/posts/PostsList'
import { PostMetaTags } from '../components/shared/MetaTags'
import Container from '../components/layouts'
import { getPost, deletePost, getSimilarPosts } from '../api/posts'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../constants/layouts'
import Text, {Heading, Subheading} from '../components/typography';
import DialogueBox from '../components/modal/DialogueBox';
import {forceProfileUpdate, forceTagUpdate} from '../actions/updates'
import { makeToast } from '../actions/toasts'
import {isClient} from '../constants'
import {getPostSharableLink} from '../utils'

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const DeleteIcon = (props) => (
  <Icon {...props} name='trash'/>
);

const ShareIcon = (props) => (
  <Icon {...props} name='share'/>
);

const PostScreen = props => {
  const [loading, setLoading] = useState(true)
  const [menuVisible, setMenuVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [post, setPost] = useState({})

  let params;
  if (isClient) params = props.route.params;
  let tag = null
  if (params) tag = props.tags.find(t => t.id === parseInt(params.tag))

  useEffect(() => {
    if (params) getPost(params.id).then(res => {
      if (res.status === 200) {
        setPost(res.data)
        setLoading(false)
      } else {
        props.navigation.goBack()
      }
    })
  }, [])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const handleDelete = () => {
    setModal(false)
    if (params) deletePost(params.id).then(res => {
      props.forceTagUpdate(tag.id)
      props.forceProfileUpdate()
      props.navigation.goBack()
      props.makeToast('Post successfully deleted', 'SUCCESS')
    })
  }
  const handleCopyLink = () => {
    setShareModal(false)
    Clipboard.setString(getPostSharableLink(params.id))
    props.makeToast('Link copied to clipboard', 'SUCCESS')
  }

  const handleNeverMind = () => {
    setModal(false)
  }

  const handleDeleteAlert = () => {
    setModal(true)
    setMenuVisible(false)
  };

  const handleShareLink = () => {
    setShareModal(true)
    setMenuVisible(false)
  };

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        {post.is_mine && <MenuItem accessoryLeft={DeleteIcon} title='Delete'
          onPress={() => handleDeleteAlert()}
        />}
        <MenuItem accessoryLeft={ShareIcon} title='Share Link'
          onPress={() => handleShareLink()}
        />
      </OverflowMenu>
    </React.Fragment>
  );

  return (<>
    <PostMetaTags
      post={post}
      tag={tag} 
    />
    <SafeAreaView>
      <TopNavigation
        title={'From ' + (tag ? tag.title : '...')}
        onBack={() => props.navigation.goBack()}
        accessoryRight={renderOverflowMenuAction}
      />
      <Layout
        style={{height: layouts.window.height}}
      >
        <ScrollView
          style={{
            flex: 1
          }}
          contentContainerStyle={{
            paddingBottom: 150
          }}
        >
          {!loading && <>
            <Post
              {...post}
              standalone={true}
            />
            <SimilarPosts id={params.id} tags={props.tags} />
          </>}
          
        </ScrollView>
      </Layout>
      <DialogueBox
        visible={modal}
        onHide={() => setModal(false)}
        title='Warning'
        description="Once you delete your post, it'll be gone for good and you can't recover it! Are you sure you want to proceed?!"
        buttons={
          [
            {
              title: 'Delete It',
              onPress: handleDelete
            },
            {
              title: 'Never Mind',
              onPress: handleNeverMind
            }
          ]
        }
      />
      <DialogueBox
        visible={shareModal}
        onHide={() => setModal(false)}
        title='Share Link'
        description={`Share this post link with your friends and enjoy it together!`}
        comp={<SharableLink id={params.id} onPress={handleCopyLink} />}
        buttons={
          [
            {
              title: 'Copy It',
              onPress: handleCopyLink
            }
          ]
        }
      />
    </SafeAreaView>
  </>)
}

export const SimilarPosts = props => {
  const [similars, setSimilars] = useState([])
  const [similarsLoading, setSimilarsLoading] = useState(false)

  useEffect(() => {
    setSimilarsLoading(true)
    getSimilarPosts(props.id).then(res => {
      setSimilars(res.data.results)
      setSimilarsLoading(false)
    })
  }, [])

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const style = isDesktopOrLaptop ? {
    marginLeft: (layouts.window.width - MAX_WIDTH) / 2 - POSTS_LIST_PADDING
  } : {}

  if (similarsLoading) return ''
  return (
    <Container>
      <Heading style={{
        marginTop: 40,
        ...style
      }}>Similar Posts</Heading>
      {
        similars.map(post => (
          <PostTemplate
            showTag={true}
            {...post}
            tag={props.tags?.find(t => t.id === parseInt(post.tag))}
          />
        ))
      }
    </Container>
  )
}

const Box = styled(TouchableOpacity)`
  // border: 1px solid #999;
  background: #eee;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
`

const SharableLink = props => {
  return (
    <Box onPress={props.onPress}>
      <Subheading>{getPostSharableLink(props.id, true)}</Subheading>
    </Box>
  )
}

PostScreen.navigationOptions = {
  header: null,
}

export default connect(state => ({
  tags: state.initials.tags,
}), {
  forceProfileUpdate,
  forceTagUpdate,
  makeToast,
})(PostScreen)
