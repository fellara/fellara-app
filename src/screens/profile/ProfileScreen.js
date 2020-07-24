import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import Profile from '../../components/profile';
import { getMyPosts } from '../../api/posts';

const ProfileScreen = props => {
  return (
    <Profile 
      getPosts={(index) => getMyPosts(index)}
      profile={props.profile}
    />
  )
}

export default connect(state => ({
  profile: state.user, 
}))(ProfileScreen)
