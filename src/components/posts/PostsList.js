import React from 'react'
import { View, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Layout, Spinner } from '@ui-kitten/components'

import Post from './'
import { Images } from '../../assets/images'
import Container from '../../components/layouts'
import layouts from '../../constants/layouts'

const LoadingWrap = styled(View)`
    padding-bottom: 120px;
    justify-content: center;
    align-items: center;
`

const PostsList = props => {
    // const [next, setNext]
    const handlePagination = () => {
        if (props.onPagination) props.onPagination()
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
                    paddingBottom: 150,
                }}
            />
            {props.paginationLoading && <LoadingWrap>
                <Spinner />
            </LoadingWrap>}
        </Container>
    )
}

export default PostsList
