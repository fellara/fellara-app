import React, {useEffect, useState} from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native'
import { Layout, Icon, MenuItem, OverflowMenu,
  TopNavigationAction } from '@ui-kitten/components';
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import TopNavigation from '../components/layouts/TopNavigation'
import Post from '../components/posts'
import PostsList from '../components/posts/PostsList'
import { PostMetaTags } from '../components/shared/MetaTags'
import Container from '../components/layouts'
import { getPost, deletePost, getSimilarPosts } from '../api/posts'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../constants/layouts'
import {Heading, Subheading} from '../components/typography';
import DialogueBox from '../components/modal/DialogueBox';
import {forceProfileUpdate, forceTagUpdate} from '../actions/updates'
import { makeToast } from '../actions/toasts'
import {isClient} from '../constants'

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const DeleteIcon = (props) => (
  <Icon {...props} name='trash'/>
);

const PostScreen = props => {
  const [loading, setLoading] = useState(true)
  const [similarsLoading, setSimilarsLoading] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState({})
  const [similars, setSimilars] = useState([])

  let params;
  if (isClient) params = props.route.params;
  let tag = null
  if (params) tag = props.tags.find(t => t.id === parseInt(params.tag))
  
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const style = isDesktopOrLaptop ? {
      marginLeft: (layouts.window.width - MAX_WIDTH) / 2 - POSTS_LIST_PADDING
    } : {}

  useEffect(() => {
    if (params) getPost(params.id).then(res => {
      if (res.status === 200) {
        setPost(res.data)
        setLoading(false)
        setSimilarsLoading(true)
        getSimilarPosts(params.id).then(res => {
          setSimilars(res.data.results)
          setSimilarsLoading(false)
        })
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

  const handleNeverMind = () => {
    setModal(false)
  }

  const handleDeleteAlert = () => {
    setModal(true)
    setMenuVisible(false)
  };

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={DeleteIcon} title='Delete'
          onPress={() => handleDeleteAlert()}
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
        accessoryRight={post.is_mine ? renderOverflowMenuAction : null}
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
            <Container>
              <Heading style={{
                marginTop: 40,
                ...style
              }}>Similar Posts</Heading>
              {
                similars.map(post => (
                  <Post
                    showTag={true}
                    {...post}
                  />
                ))
              }
            </Container>
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
    </SafeAreaView>
  </>)
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
