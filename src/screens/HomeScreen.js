import React, {useEffect, useState} from 'react';
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux'
import { Text } from 'react-native'

import { source } from '../api'
import { getPosts, getTags } from '../api/posts'
import { forceTagUpdateDone } from '../actions/updates'
import PostsList from '../components/posts/PostsList';
import TagsList from '../components/posts/TagsList';
import Container from '../components/layouts';

const HomeScreen = props => {
  let tag = null;
  if (props.route.params) tag = props.route.params.tag;

  const [posts, setPosts] = useState([])
  const [next, setNext] = useState(null)
  const [page, setPage] = useState(1)
  const [paginationLoading, setPaginationLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [activeTag, setActiveTag] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.tags.length > 0) {
      setTags(props.tags)
      changeActiveTag(props.tags[0]?.id)
    }
  }, [props.tags])

  useEffect(() => {
    changeActiveTag(tag)
  }, [tag])

  useEffect(() => {
    if (activeTag) {
      handleGetPosts(activeTag)
    }
  }, [activeTag])

  useEffect(() => {
    if (props.updates && (props.updates === activeTag)) {
      handleGetPosts(activeTag)
      props.forceTagUpdateDone()
    }
  }, [props.updates])

  const changeActiveTag = (tag) => {
    if (activeTag !== tag) {
      setActiveTag(tag)
      setPosts([])
    }
  }

  const handleGetPosts = (tag, page) => {
    // source.cancel()

    getPosts(tag, page).then(res => {
      if (res.status === 200) {
        setPosts([...posts, ...res.data.results])
        setNext(res.data.next)
      }
      setPaginationLoading(false)
    })
  }

  const handlePagination = () => {
    if (next) {
      setPaginationLoading(true)
      handleGetPosts(activeTag, page + 1)
      setPage(page + 1)
    }
  }
  return (
    <Layout>
      <TagsList data={tags} active={activeTag} setActive={changeActiveTag}/>
      <PostsList data={posts} onPagination={handlePagination} paginationLoading={paginationLoading}/>
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
