import React, {useEffect, useState} from 'react';
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux'
import { View, TouchableOpacity } from 'react-native'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios';

import { getPosts } from '../api/posts'
import { forceTagUpdateDone } from '../actions/updates'
import { setActiveTag } from '../actions/posts'
import PostsList from '../components/posts/PostsList';
import TagsList from '../components/posts/TagsList';
import {formatURL} from '../utils'
import {store} from '../store'

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
  const [first, setFirst] = useState(true)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  
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
      handleGetPosts(activeTag, 1, false)
      setFirst(false)
    }
  }, [activeTag])

  useEffect(() => {
    if (activeTag) {
      setPosts([])
      handleGetPosts(activeTag, 1, true)
      props.forceTagUpdateDone()
    }
  }, [props.updates])

  const changeActiveTag = (tag) => {
    if (activeTag !== tag) {
      source.cancel('Operation canceled by the user.');
      setPage(1)
      setNext(null)
      setPosts([])
      setActiveTag(tag)
      props.setActiveTag(tag)
    }
  }

  const handleGetPosts = (tag, page, refresh) => {
    let url = `post/list/?page=${page}`
    if (tag) url += '&tag=' + tag

    let action = first && 'APP_VISIT'
    if (action) url += '&action=' + action
    

    const config = {
      method: 'GET',
      url: formatURL(url),
      cancelToken: source.token,
      headers: {}
    }
    const token = store.getState().token
    if (token) {
      config.headers.Authorization = 'Token ' + token
    }

    axios(config).then(res => {
      if (res.status === 200) {
        if (!refresh) {
          setPosts([...posts, ...res.data.results])
        } else {
          setPosts(res.data.results)
        }
        setNext(res.data.next)
      } else if (res.status === 404) {
        setNext(null)
      }
      setPaginationLoading(false)
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
      }
    });
  }

  const handlePagination = () => {
    if (next) {
      setPaginationLoading(true)
      handleGetPosts(activeTag, page + 1)
      setPage(page + 1)
    }
  }

  return (<>
    <Layout>
      <TagsList data={tags} active={activeTag} setActive={changeActiveTag}/>
      <PostsList 
        data={posts} onPagination={handlePagination} paginationLoading={paginationLoading}
        endReached={posts.length > 0 && !next}
      />
    </Layout>
  </>)
}

HomeScreen.navigationOptions = {
  header: null,
}

export default connect(state => ({
  tags: state.initials.tags,
  updates: state.updates.tag,
}), {
  forceTagUpdateDone,
  setActiveTag,
})(HomeScreen)
