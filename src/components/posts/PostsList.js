import React from 'react'
import { View, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Layout } from '@ui-kitten/components'

import Post from './'
import { Images } from '../../assets/images'
import Container from '../../components/layouts'
import layouts from '../../constants/layouts'

const PostsList = props => {
    // const [next, setNext] 
    const handlePagination = () => {

    }

    return (
        <Container 
            // A fix for flatlist not scrolling in web.
            // Buggy though. Need a change.
            style={{height: layouts.window.height}}
            // paddingbottom={150}
        >
            <FlatList
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<Post {...item} />)}
                data={props.data}
                onEndReached={handlePagination}
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
            />
        </Container>
    )
}

export default PostsList