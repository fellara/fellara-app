import React, {useEffect, useState} from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native'
import { Layout, Icon, MenuItem, OverflowMenu,
  TopNavigationAction } from '@ui-kitten/components';
import { connect } from 'react-redux'

import TopNavigation from '../components/layouts/TopNavigation'
import Post from '../components/posts'
import PostsList from '../components/posts/PostsList'
import MetaTags from '../components/shared/MetaTags'
import Container from '../components/layouts'
import { getPost, deletePost, getSimilarPosts } from '../api/posts'
import layouts from '../constants/layouts'
import {Heading, Subheading} from '../components/typography';
import DialogueBox from '../components/modal/DialogueBox';
import {forceProfileUpdate, forceTagUpdate} from '../actions/updates'
import {getImageUrl} from '../utils'

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

  const { params } = props.route;
  let tag = null
  if (params) tag = props.tags.find(t => t.id === parseInt(params.tag))

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
    deletePost(params.id).then(res => {
      props.forceTagUpdate(tag.id)
      props.forceProfileUpdate()
      props.navigation.goBack()
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
    <MetaTags 
      title={`fellara | Post ${post.user_info ? 'by ' + post.user_info.name + ' in ' + post.user_info.location : ''}`}
      description={`
        ${tag ? 'From ' + tag.title : ''}${' \n'}
        ${'Fellara is platform for sharing your culture and traditions. People from all around the world share their daily life via fellara.'}
      `}
      image={getImageUrl(post.clean_image_medium?.url)}
      url={`http://app.fellara.com/page?id=${params.id}&tag=${tag?.id}`}
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
})(PostScreen)
