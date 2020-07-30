import React, {useEffect, useState} from 'react';
import { ScrollView, Alert, SafeAreaView } from 'react-native'
import { Layout, Icon, MenuItem, OverflowMenu,
  TopNavigationAction } from '@ui-kitten/components';
import { connect } from 'react-redux'

import TopNavigation from '../components/layouts/TopNavigation'
import Post from '../components/posts'
import { getPost, deletePost } from '../api/posts'
import layouts from '../constants/layouts'
import Container from '../components/layouts';
import DialogueBox from '../components/modal/DialogueBox';
import {forceProfileUpdate, forceTagUpdate} from '../actions/updates'

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const DeleteIcon = (props) => (
  <Icon {...props} name='trash'/>
);

const PostScreen = props => {
  const [loading, setLoading] = useState(true)
  const [menuVisible, setMenuVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState({})

  const { params } = props.route;
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

  return (
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
          {!loading && <Post
            {...post}
            standalone={true}
          />}
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
})(PostScreen)
