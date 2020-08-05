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
    padding-top: 15px;
`

const PostsList = props => {
    const handlePagination = () => {
        if (props.onPagination && !props.paginationLoading) props.onPagination()
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
                // onEndReachedThreshold={20}
                contentContainerStyle={{
                    paddingBottom: 150,
                }}
                ListFooterComponent={props.paginationLoading && <LoadingWrap>
                    <Spinner />
                </LoadingWrap>}
            />
        </Container>
    )
}

export default PostsList
