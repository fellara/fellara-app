import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Layout } from '@ui-kitten/components'

import Post from './'
import { Colors } from '../../assets/utils/Colors'
import { Images } from '../../assets/images'
import Text from '../typography';
import Container from '../../components/layouts'

const Tag = styled(TouchableOpacity)`
  padding: 10px 20px;
  background: ${p => p.active ? '#222' : '#777'};
  margin-left: 10px;
  border-radius: 20px;
`

const StyledText = styled(Text)`
    color: #fff;
`

const TagsList = props => {
    return (
        <Container
            horizontal={true}
            as={ScrollView}
        >
            {
                props.data.map((tag, index) =>
                    <Tag 
                        key={tag.id}
                        active={props.active === tag.id} 
                        onPress={() => props.setActive(tag.id)}
                    >
                        <StyledText>{tag.title}</StyledText>
                    </Tag>
                )
            }
        </Container>
    )
}

export default TagsList