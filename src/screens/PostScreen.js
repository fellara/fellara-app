import React, {useEffect, useState} from 'react';
import { ScrollView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux'

import TopNavigation from '../components/layouts/TopNavigation'
import Post from '../components/posts'
import layouts from '../constants/layouts'
import Container from '../components/layouts';

const PostScreen = props => {
  let post = null;
  if (props.route.params) post = props.route.params;
  const tag = props.tags.find(t => t.id === parseInt(post.tag))

  console.log(props);
  

  return (<>
      <TopNavigation 
        title={'From ' + tag?.title}
        onBack={() => props.navigation.goBack()}
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
        <Post
          standalone={true}
          clean_image_medium={{
            url: post.url,
            width: post.width,
            height: post.height,
          }}
          user_info={{
            avatar: post.avatar,
            name: post.name,
            location: post.location
          }}
          created_at={post.created_at}
        />
      </ScrollView>
    </Layout>
  </>)
}

PostScreen.navigationOptions = {
  header: null,
}

export default connect(state => ({
  tags: state.initials.tags,
}), {
})(PostScreen)
