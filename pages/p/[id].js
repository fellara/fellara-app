import { useRouter } from 'next/router'
import { SafeAreaView, ScrollView } from 'react-native'
import { Layout } from '@ui-kitten/components';
import Error from 'next/error';

import {PostTemplate} from '../../src/components/posts'
import {PostMetaTags} from '../../src/components/shared/MetaTags'
import {getImageUrl} from '../../src/utils'
import TopNavigation from '../../src/components/layouts/TopNavigation'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../src/constants/layouts'

const PostPage = ({post, tags}) => {
  const { isFallback } = useRouter();

  console.log(isFallback);
  if (!isFallback && !post) {
    return <Error statusCode={404} title="This post could not be found" />;
  }

  let tag = {}
  if (tags) tag = tags.find(t => post.tag === t.id)

  if (post) return (<>
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
          <PostTemplate {...post} standalone={true} />
        </ScrollView>
      </Layout>
    </ SafeAreaView>
  </>)
  return 'Loading...'
}

export async function getStaticProps({params}) {
  try {
    const postRes = await fetch(`https://fellara.com/api/v1/post/${params.id}/?source=PWA`)
    const tagsRes = await fetch(`https://fellara.com/api/v1/post/tags/`)
    const post = await postRes.json()
    const tags = await tagsRes.json()
    return { props: { post, tags } }
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default PostPage