import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Layout } from '@ui-kitten/components'

import Post from './'
import { Images } from '../../assets/images'
import Text from '../typography';
import Container from '../../components/layouts'

const Tag = styled(TouchableOpacity)`
  background: ${p => p.active ? '#222' : '#777'};
  margin-right: 10px;
  border-radius: 20px;
  height: 35px;
  padding: 0 20px;
  justify-content: center;
`

const StyledText = styled(Text)`

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
                        <StyledText style={{
                            color: '#fff'
                        }}>{tag.title}</StyledText>
                    </Tag>
                )
            }
        </Container>
    )
}

export default TagsList