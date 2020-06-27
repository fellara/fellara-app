import React from 'react'
import { ScrollView, Image, FlatList } from 'react-native'
import styled from 'styled-components'
import { Avatar, Layout } from '@ui-kitten/components'

import Post from './'
import { Colors } from '../../assets/utils/Colors'
import { Images } from '../../assets/images'

const Container = styled(ScrollView)`
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  height: 100%;
`

const PostsList = props => {
    return (
        <Container>
            <FlatList
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<Post {...item} />)}
                data={props.data}
            />
        </Container>
    )
}

export default PostsList