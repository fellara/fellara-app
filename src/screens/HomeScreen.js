import React, {useEffect, useState} from 'react';
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux'

import { getPosts, getTags } from '../api/posts'
import { forceTagUpdateDone } from '../actions/updates'
import PostsList from '../components/posts/PostsList';
import TagsList from '../components/posts/TagsList';
import Container from '../components/layouts';

const HomeScreen = props => {
  let tag = null;
  if (props.route.params) tag = props.route.params.tag;

  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [activeTag, setActiveTag] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTags(props.tags)
    setActiveTag(props.tags[0]?.id)
    // tag = null;
    // getPosts(props.tags[0]?.id).then(res => {
    //   setPosts(res.data.results)
    // })
  }, [props.tags])

  useEffect(() => {
    // if (tag) setActiveTag(activeTag)
    if (activeTag) getPosts(activeTag).then(res => {
      setPosts(res.data.results)
    })
  }, [activeTag])

  useEffect(() => {
    // if (tag) setActiveTag(activeTag)
    console.log(props.updates, activeTag);
    
    if (props.updates && (props.updates === activeTag)) {
      getPosts(activeTag).then(res => {
        setPosts(res.data.results)
      })
      props.forceTagUpdateDone()
    }
  }, [props.updates])

  return (
    <Layout>
      <TagsList data={tags} active={activeTag} setActive={setActiveTag}/>
      <PostsList data={posts} />
    </Layout>
  )
}

HomeScreen.navigationOptions = {
  header: null,
}

export default connect(state => ({
  tags: state.initials.tags,
  updates: state.updates.tag,
}), {
  forceTagUpdateDone
})(HomeScreen)
