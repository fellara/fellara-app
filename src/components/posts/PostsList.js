import React from 'react'
import { ScrollView, Image, FlatList } from 'react-native'
import styled from 'styled-components'
import { Avatar, Layout } from '@ui-kitten/components'

import Post from './'
import { Colors } from '../../assets/utils/Colors'
import { Images } from '../../assets/images'
import Container from '../../components/layouts'

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