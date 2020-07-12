import React, {useEffect, useState} from 'react';
import { ScrollView, View, Image, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { Avatar, Button, Layout, Icon, MenuItem, OverflowMenu, 
  TopNavigationAction } from '@ui-kitten/components';

import Form from '../../components/forms'
import Container from '../../components/layouts';
import Text, { Heading, Subheading } from '../../components/typography';
import AuthScreen from '../../navigation/AuthNavigator';
import { logout } from '../../api/user';
import { getMyPosts } from '../../api/posts';
import { logoutUser } from '../../actions/user';
import { forceProfileUpdateDone } from '../../actions/updates';
import TopNavigation from '../../components/layouts/TopNavigation'
import PostsList from '../../components/posts/PostsList';
import {base_url} from '../../constants/'
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

const ProfileScreen = ({isLoggedIn, profile, updates, ...props}) => {
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(false)
  // const [height, setHeight] = useState(100)
  const [loading, setLoading] = useState(false)
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const margin = 2;
  const height = (layouts.window.width - (20 + 6 * margin)) / 3

  let _back = null;
  if (props.route.params) _back = props.route.params._back;

  useEffect(() => {
    getMyPosts().then(res => {
      setPosts(res.data.results)
    })
  }, [isLoggedIn])

  useEffect(() => {
    console.log(profile);
    
  }, [profile])

  useEffect(() => {
    if (updates) {
      getMyPosts().then(res => {
        setPosts(res.data.results)
      })
      props.forceProfileUpdateDone()
    }
  }, [updates])

  const handleLogout = () => {
    props.logoutUser()
    logout()
    setMenuVisible(false);
  }

  if (!isLoggedIn) return <AuthScreen _back={_back} />;
  if (_back) {
    props.navigation.navigate(_back)
  }


  const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 30,
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

  const handleSetEditing = () => {
    setEditing(true);
    setMenuVisible(false)
  }

  const renderSubmitEditing = () => (
      <TopNavigationAction icon={CheckIcon}
        onPress={() => setEditing(false)}
      />
  );

  return (<>
      <TopNavigation title={!editing ? 'Profile' : 'Edit Profile'} noBack={!editing}
        onBack={() => setEditing(false)}
        accessoryRight={!editing ? renderOverflowMenuAction : null}
      />
      <Container 
          as={ScrollView} 
          center
          nopadding
        >
        <StyledLayout
          style={{height: layouts.window.height}}
        >
          {!editing ? <>
          <Header>
            <Avatar 
              size='giant' 
              source={profile.profile_image_small} 
              style={{'width': 100, 'height': 100, 'marginBottom': 10}} 
              resizeMode='cover'
            />
            <Heading>{profile.first_name + ' ' + profile.last_name}</Heading>
            <Subheading marginbottom>{profile.location}</Subheading>
          </Header>
          <ImagesWrap>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column', margin, width: height}}>
                  <Image style={styles.imageThumbnail} 
                    resizeMode='cover'
                    source={{ uri: base_url + item.clean_image_small?.url }} />
                    {/* onLayout={event => setHeight(event.layout.width)} */}
                </View>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </ImagesWrap>
          </> : <EditProfileScreen profile={profile} setEditing={setEditing}/>}
        </StyledLayout>
      </Container>
    </>
  )
}

export default connect(state => ({
  isLoggedIn: state.user.isLoggedIn, profile: state.user, updates: state.updates.profile
}), {
  logoutUser,
  forceProfileUpdateDone,
})(ProfileScreen)
