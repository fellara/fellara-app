import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View, Image, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { Avatar, Button, Layout, Icon, MenuItem, OverflowMenu, 
  TopNavigationAction, Spinner } from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Heading, Subheading } from '../../components/typography';
import AuthScreen from '../../navigation/AuthNavigator';
import { logout } from '../../api/user';
import { logoutUser } from '../../actions/user';
import { forceProfileUpdateDone } from '../../actions/updates';
import TopNavigation from '../../components/layouts/TopNavigation'
import PostsList from '../../components/posts/PostsList';
import {base_url} from '../../constants/'
import {getImageUrl} from '../../utils/'
import layouts from '../../constants/layouts'
import EditProfileScreen from './EditProfileScreen'

const Header = styled(View)`
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
`

const StyledLayout = styled(Layout)`
  padding-left: 10px;
  padding-right: 10px;
`

const ImagesWrap = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: space-between;
`
const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin: 15px;
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
  const [paginationLoading, setPaginationLoading] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const margin = 2;
  const height = (layouts.window.width - (20 + 6 * margin)) / 3

  let _back = null;
  if (route?.params) _back = route.params._back;

  useEffect(() => {
    handleGetPosts()
  }, [isLoggedIn])

  useEffect(() => {
    if (updates) {
      handleGetPosts()

      props.forceProfileUpdateDone()
    }
  }, [updates])

  const handleGetPosts = (pageIndex) => {
    props.getPosts(pageIndex).then(res => {
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
    if (next) {
      setPaginationLoading(true)
      handleGetPosts(page + 1)
      setPage(page + 1)
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

  if (!isLoggedIn) return <AuthScreen _back={_back} />;
  if (_back) {
    navigation.navigate(_back)
  }


  const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 30,
    },
    list: {
      paddingBottom: 150,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      width: height
    },
  });

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={EditIcon} title='Edit'
          onPress={handleSetEditing}
        />
        <MenuItem accessoryLeft={LogoutIcon} title='Logout'
          onPress={handleLogout}
        />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderHeader = (profile) => (
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

  const renderFooter = (paginationLoading) => (
    paginationLoading && <LoadingWrap>
      <Spinner />
    </LoadingWrap>
  )

  const renderItem = (item, margin, height, styles, profile) => {
    return (<TouchableOpacity 
      onPress={() => navigation.navigate('post', {
        tag: item.tag,
        id: item.id,
        _back: 'Profile',
      })}
      style={{ flexDirection: 'column', margin, width: height}}>
      <Image style={styles.imageThumbnail} 
        resizeMode='cover'
        source={{ uri: base_url + item.clean_image_small?.url }} />
    </TouchableOpacity>
  )}

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
      /> : <TopNavigation
        onBack={() => navigation.goBack()}
        accessoryLeft={showHeader ? renderImage() : null}
        title={!props.loading ? profile.first_name.toUpperCase() + "'s Profile" : 'Loading...'} 
      />}
      <StyledLayout
        style={{height: layouts.window.height}}
      >
        {!props.loading ? !editing ? <FlatList
            data={posts}
            onEndReached={handlePagination}
            // onEndReachedThreshold={10}
            onScroll={handleScroll}
            renderItem={({ item }) => renderItem(item, margin, height, styles, profile)}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => renderHeader(profile)}
            ListFooterComponent={() => renderFooter(paginationLoading)}
            contentContainerStyle={styles.list}
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
