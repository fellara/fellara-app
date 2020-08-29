import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error';

import Profile from '../../src/components/profile';
import {getPostsByUserID } from '../../src/api/posts';
import {ProfileMetaTags} from '../../src/components/shared/MetaTags'
import {app_url} from '../../src/constants'
import {getPostLink} from '../../src/utils'

const ProfilePage = ({profile}) => {
  const { isFallback, query } = useRouter();

  if (!isFallback && profile?.message) {
    return <Error statusCode={404} title="This profile could not be found" />;
  }

  if (profile && typeof(window) !== 'undefined') return (<>
      <ProfileMetaTags
        profile={profile}
      />
      <Profile 
        onBack={() => window.location.href = (app_url)}
        onPostPress={(id, tag) => window.location.href = getPostLink(id, tag)}
        getPosts={(index) => getPostsByUserID(query.id, index)}
        profile={profile}
        others={true}
        loading={!profile}
        ssr={true}
      />
    </>
  )

  if (profile) return (<ProfileMetaTags
    profile={profile}
  />)
  
  return ''
}

export async function getServerSideProps({params}) {
  try {
    const res = await fetch(`https://fellara.com/api/v1/user/rest-auth/user/${params.id}/?source=PWA`)
    const profile = await res.json()
    console.log(profile);
    return {props: {profile}}
  } catch (error) {
    return {props: {}}
  }

}

// export async function getStaticPaths() {
//   return { paths: [], fallback: true };
// }

export default ProfilePage