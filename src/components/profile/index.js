import React, {useEffect, useState} from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { Avatar, Layout, Icon, MenuItem, OverflowMenu, 
  TopNavigationAction, Spinner } from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Heading, Subheading } from '../../components/typography';
import AuthScreen from '../../navigation/AuthNavigator';
import { logout } from '../../api/user';
import { logoutUser } from '../../actions/user';
import { forceProfileUpdateDone } from '../../actions/updates';
import TopNavigation from '../../components/layouts/TopNavigation'
import {getImageUrl} from '../../utils/'
import layouts from '../../constants/layouts'
import EditProfileScreen from './EditProfileScreen'
import PostsGrid from '../posts/PostsGrid';

const Header = styled(View)`
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
`

const StyledLayout = styled(Layout)`
  padding-left: 10px;
  padding-right: 10px;
`

const LoadingWrap = styled(View)`
  padding-bottom: 120px;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
`

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const CheckIcon = (props) => (
  <Icon {...props} name='checkmark'/>
);

const StarIcon = (props) => (
  <Icon {...props} name={'star'}/>
)


const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const Profile = ({isLoggedIn, profile, updates, ...props}) => {
  const [showHeader, setShowHeader] = useState(false)
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [next, setNext] = useState(null)
  const [page, setPage] = useState(1)
  const [seenPages, setSeenPages] = useState([1])
  const [paginationLoading, setPaginationLoading] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  let _back = null;
  if (route?.params) _back = route.params._back;

  useEffect(() => {
    if (isLoggedIn) handleGetPosts()
  }, [isLoggedIn])

  useEffect(() => {
    if (updates) {
      handleGetPosts()
      props.forceProfileUpdateDone()
    }
  }, [updates])

  const handleGetPosts = (pageIndex) => {
    if (props.getPosts) props.getPosts(pageIndex).then(res => {
      if (res.status === 200) {
        setPosts([...posts, ...res.data.results])
        setNext(res.data.next)
      } else if (res.status === 404) {
        setNext(null)
      }
      setPaginationLoading(false)
    })
  }

  const handlePagination = () => {
    const nextPage = page + 1

    if (next && !seenPages.includes(nextPage)) {
      setPaginationLoading(true)
      handleGetPosts(nextPage)
      setPage(nextPage)
      setSeenPages([...seenPages, nextPage])
    }
  }

  

  const cleanIt = () => {
    setMenuVisible(false);
    setPosts([])
    setNext(null)
    setPage(1)
    setEditing(false)
  }

  const handleLogout = () => {
    props.logoutUser()
    logout()
    cleanIt()
  }

  const handleStarred = () => {
    setMenuVisible(false);
    navigation.navigate('liked-posts')
  }

  if (!isLoggedIn) return <AuthScreen _back={_back} params={route.params} />;
  if (_back) {
    navigation.navigate(_back, {...route.params, authSuccessful: true})
  }

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={EditIcon} title='Edit'
          onPress={handleSetEditing}
        />
        <MenuItem accessoryLeft={StarIcon} title='Starred'
          onPress={handleStarred}
        />
        <MenuItem accessoryLeft={LogoutIcon} title='Logout'
          onPress={handleLogout}
        />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderProfileHeader = (profile) => (
    <Header>
      <Avatar 
        size='giant' 
        source={getImageUrl(profile.profile_image_small)} 
        style={{'width': 100, 'height': 100, 'marginBottom': 10}} 
        resizeMode='cover'
      />
      <Heading>{profile.first_name + ' ' + profile.last_name}</Heading>
      <Subheading marginbottom>{profile.location}</Subheading>
    </Header>
  );

  const renderFooter = () => (
    <LoadingWrap style={{
      paddingBottom: 150
    }}>
      {paginationLoading && <Spinner />}
    </LoadingWrap>
  )

  const renderHeader = () => (
    props.ListHeaderComponent 
      ? props.ListHeaderComponent 
      : !props.noHeader 
        ? renderProfileHeader(profile) 
        : null
  )

  const handleScroll = ({nativeEvent}) => {
    if (nativeEvent.contentOffset.y > 200) {
      setShowHeader(true)
    } else {
      setShowHeader(false)
    }
  }

  const handleSetEditing = () => {
    setEditing(true);
    setMenuVisible(false)
  }

  const renderImage = (props) => (
    <Avatar 
      source={getImageUrl(profile.profile_image_small)} 
      style={{'width': 30, 'height': 30, marginRight: 12}} 
      resizeMode='cover'
    />
  );

  return (<>
      {!props.others ? <TopNavigation 
        title={!editing ? !showHeader ? 'Profile' : profile.first_name + ' ' + profile.last_name : 'Edit Profile'} 
        noBack={!editing}
        onBack={() => setEditing(false)}
        accessoryRight={!editing ? renderOverflowMenuAction : null}
        accessoryLeft={!editing ? showHeader ? renderImage() : null : null}
      /> : !(props.noHeader || props.ListHeaderComponent) ? <TopNavigation
        onBack={() => navigation.goBack()}
        accessoryLeft={showHeader ? renderImage() : null}
        title={!props.loading ? profile.first_name.toUpperCase() + "'s Profile" : 'Loading...'} 
      /> : <TopNavigation
        onBack={() => navigation.goBack()}
        title={!props.loading ? 'My Starred Posts' : 'Loading...'} 
      />}
      <StyledLayout
        style={{height: layouts.window.height}}
      >
        {!props.loading ? !editing ? <PostsGrid
            data={posts}
            onPagination={handlePagination}
            paginationLoading={paginationLoading}
            onScroll={handleScroll}
            forcePaginate={props.forcePaginate}
            ListHeaderComponent={() => renderHeader()}
            endReached={posts.length > 0 && !next}
            ListFooterComponent={() => renderFooter()}
          /> : <EditProfileScreen profile={profile} setEditing={setEditing}/> : <LoadingWrap><Spinner /></LoadingWrap>}
      </StyledLayout>
    </>
  )
}

export default connect(state => ({
  isLoggedIn: state.user.isLoggedIn, 
  updates: state.updates.profile
}), {
  logoutUser,
  forceProfileUpdateDone,
})(Profile)
