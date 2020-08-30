import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { Layout } from '@ui-kitten/components';
import Error from 'next/error';

import {PostTemplate} from '../../src/components/posts'
import {PostMetaTags} from '../../src/components/shared/MetaTags'
import {getProfileLink, getPostLink} from '../../src/utils'
import TopNavigation from '../../src/components/layouts/TopNavigation'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../src/constants/layouts'
import {SimilarPosts} from '../../src/screens/PostScreen'
import {base_url, app_url} from '../../src/constants'

const PostPage = ({post, tags}) => {
  const { isFallback } = useRouter();

  if (!isFallback && post.detail) {
    return <Error statusCode={404} title="This post could not be found" />;
  }

  let tag = {}
  if (tags) tag = tags.find(t => post.tag_new === t.id)

  if (post && typeof(window) !== 'undefined') return (<>
    <PostMetaTags
      post={post}
      tag={tag} 
    />
    <SafeAreaView>
      <TopNavigation
        title={'From ' + (tag ? tag.title : '...')}
        onBack={() => window.location.href = (app_url)}
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
            paddingBottom: 150,
          }}
        >
          <PostTemplate 
            {...post} 
            standalone={true} 
            onAvatarPress={() => window.location.href = getProfileLink(post.user)}
          />
          <SimilarPosts 
            id={post.id} tags={tags} 
            onAvatarPress={(isMine, id) => window.location.href = getProfileLink(id)}
            onPress={(id, tag) => window.location.href = getPostLink(id, tag)}
          />
        </ScrollView>
      </Layout>
    </ SafeAreaView>
  </>)

  if (post) return (<PostMetaTags
    post={post}
    tag={tag} 
  />)

  return ''
}

export async function getServerSideProps({params}) {
  try {
    const postRes = await fetch(`https://fellara.com/api/v1/post/${params.id}/?source=PWA`)
    const tagsRes = await fetch(`https://fellara.com/api/v1/post/tags/`)
    const post = await postRes.json()
    const tags = await tagsRes.json()
    return {props: {post, tags}}
  } catch (error) {
    return {props: {}}
  }

}

// export async function getStaticPaths() {
//   return { paths: [], fallback: true };
// }

export default PostPage