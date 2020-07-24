import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import Profile from '../components/profile';
import { getMyPosts, getPostsByUserID } from '../api/posts';
import { getProfileByUserID } from '../api/user';

const ProfileScreen = props => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const {params} = props.route
  
  useEffect(() => {
    setLoading(true)
    getProfileByUserID(params.id).then(res => {
      setProfile(res.data)
      setLoading(false)
  })
  }, [])

  return (
    <Profile 
      getPosts={(index) => getPostsByUserID(params.id, index)}
      profile={profile}
      others={true}
      loading={loading}
    />
  )
}

export default ProfileScreen
