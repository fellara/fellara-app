import React from 'react'
import { View, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Layout } from '@ui-kitten/components'

import Post from './'
import { Images } from '../../assets/images'
import Container from '../../components/layouts'
import layouts from '../../constants/layouts'

const PostsList = props => {
    return (
        <Container 
            // A fix for flatlist not scrolling in web.
            // Buggy though. Need a change.
            style={{height: layouts.window.height}}
        >
            <FlatList
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<Post {...item} />)}
                data={props.data}
            />
        </Container>
    )
}

export default PostsList