import * as WebBrowser from 'expo-web-browser';
import React, {useEffect, useState} from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components'
import { Layout, Text } from '@ui-kitten/components';

import { getPosts, getTags } from '../api/posts'
import PostsList from '../components/posts/PostsList';
import TagsList from '../components/posts/TagsList';
import Container from '../components/layouts';

const HomeScreen = props => {
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [activeTag, setActiveTag] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTags().then(res => {
      setTags(res.data)
      setActiveTag(res.data[0].id)
      getPosts(res.data[0].id).then(res => {
        setPosts(res.data.results)
      })
    })
  }, [])

  useEffect(() => {
    getPosts(activeTag).then(res => {
      setPosts(res.data.results)
    })
  }, [activeTag])

  return (
    <View>
      <Layout>
        <TagsList data={tags} active={activeTag} setActive={setActiveTag}/>
        <PostsList data={posts} />
      </Layout>
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null,
}

export default HomeScreen
