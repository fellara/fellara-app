import React, {useEffect, useState} from 'react';
import { ScrollView, View, Image, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'

import Form from '../components/forms'
import Container from '../components/layouts';
import Text, { Heading, Subheading } from '../components/typography';
import AuthScreen from '../navigation/AuthNavigator';
import { Avatar, Button, Layout } from '@ui-kitten/components';
import { logout } from '../api/user';
import { getMyPosts } from '../api/posts';
import { logoutUser } from '../actions/user';
import TopNavigation from '../components/layouts/TopNavigation'
import PostsList from '../components/posts/PostsList';
import {base_url} from '../constants/'
import layouts from '../constants/layouts'

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

const ProfileScreen = ({isLoggedIn, profile, ...props}) => {
  const [posts, setPosts] = useState([])
  // const [height, setHeight] = useState(100)
  const [loading, setLoading] = useState(false)

  const margin = 2;
  const height = (layouts.window.width - (20 + 6 * margin)) / 3

  let _back = null;
  if (props.route.params) _back = props.route.params._back;

  useEffect(() => {
    getMyPosts().then(res => {
      setPosts(res.data.results)
    })
  }, [isLoggedIn])

  const handleLogout = () => {
    props.logoutUser()
    logout()
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

  return (<>
      <TopNavigation title={'Profile'} />
      <Container 
          as={ScrollView} 
          center
          nopadding
        >
        <StyledLayout
          style={{height: layouts.window.height}}
        >
          <Header>
            <Avatar 
              size='giant' 
              source={profile.profile_image} 
              style={{'width': 100, 'height': 100, 'marginBottom': 10}} 
              resizeMode='cover'
            />
            <Heading>{profile.first_name + ' ' + profile.last_name}</Heading>
            <Subheading marginbottom>{profile.city + ', ' + profile.country}</Subheading>
          </Header>
          <ImagesWrap>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column', margin, width: height}}>
                  <Image style={styles.imageThumbnail} 
                    resizeMode='cover'
                    source={{ uri: base_url + item.clean_image_medium.url }} />
                    {/* onLayout={event => setHeight(event.layout.width)} */}
                </View>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </ImagesWrap>
          <Button appearance='ghost' status='primary'
            onPress={handleLogout}
          >
            Exit
          </Button>
        </StyledLayout>
      </Container>
    </>
  )
}

export default connect(state => ({isLoggedIn: state.user.isLoggedIn, profile: state.user}), {
  logoutUser
})(ProfileScreen)
