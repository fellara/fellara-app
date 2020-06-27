import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { Avatar, Layout } from '@ui-kitten/components'

import Post from './'
import { Colors } from '../../assets/utils/Colors'
import { Images } from '../../assets/images'
import { MonoText } from '../StyledText';

const Container = styled(ScrollView)`
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
`
const Tag = styled(TouchableOpacity)`
  padding: 10px 20px;
  background: ${p => p.active ? '#222' : '#777'};
  margin-left: 10px;
  border-radius: 20px;
`

const Text = styled(MonoText)`
    color: #fff;
`

const TagsList = props => {
    return (
        <Container
            horizontal={true}
        >
            {
                props.data.map((tag, index) =>
                    <Tag 
                        key={tag.id}
                        active={props.active === tag.id} 
                        onPress={() => props.setActive(tag.id)}
                    >
                        <Text>{tag.title}</Text>
                    </Tag>
                )
            }
        </Container>
    )
}

export default TagsList