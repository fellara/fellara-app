import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import Profile from '../components/profile';
import { getMyLikedPosts } from '../api/posts';
import Text, { Heading, Subheading } from '../components/typography';
import { Button } from 'react-native';

const LikedPostsScreen = props => {
  const [loading, setLoading] = useState(true)
  const [forcePaginate, setForcePaginate] = useState(false)
  const {params} = props.route
  
  const renderHeader = props => (<>
    <Heading>Starreds</Heading>
    <Subheading marginbottom>All posts that you've starred before will be kept here. To remove them from the Starreds just open up the post and tap on the star icon again.</Subheading>
  </>)

  return (<>
      {/* <Button onPress={() => setForcePaginate(true)}>hey</Button> */}
      <Profile 
        getPosts={(index) => getMyLikedPosts(index)}
        others={true}
        forcePaginate={forcePaginate}
        ListHeaderComponent={renderHeader()}
        // loading={loading}
      />
    </>
  )
}

export default LikedPostsScreen
