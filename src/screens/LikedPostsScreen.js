import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import Profile from '../components/profile';
import { getMyLikedPosts } from '../api/posts';
import Text, { Heading, Subheading } from '../components/typography';

const LikedPostsScreen = props => {
  const [loading, setLoading] = useState(true)
  const {params} = props.route
  
  const renderHeader = props => (<>
    <Heading>Login</Heading>
    <Subheading marginbottom>{!props._back ? 'Login to get more of fellara!' : 'In order to move further you need to login first.'}</Subheading>
  </>)

  return (
    <Profile 
      getPosts={(index) => getMyLikedPosts(index)}
      others={true}
      noHeader={true}
      ListHeaderComponent={() => renderHeader()}
      // loading={loading}
    />
  )
}

export default LikedPostsScreen
