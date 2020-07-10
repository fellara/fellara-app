import React, {useRef, useState} from 'react'
import { ScrollView, View, TouchableOpacity, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Avatar, Layout } from '@ui-kitten/components'

import Post from './'
import { Images } from '../../assets/images'
import Text from '../typography';
import Container from '../../components/layouts'

const Tag = styled(TouchableOpacity)`
  background: ${p => p.active ? '#222' : '#b1b1b1'};
  margin-right: 10px;
  border-radius: 20px;
  height: 35px;
  padding: 0 20px;
  justify-content: center;
`

const StyledText = styled(Text)`

`

const TagsList = props => {
    let list = useRef();
    const [sizes, setSizes] = useState([])

    const getItemLayout = (data, index) => {
        let current = data[index]
        // return({ length: 80, offset: 50 * index, index })
        return({ length: sizes.find(s => current.id === s.id)?.width || 70, offset: 50 * index, index })
    }

    const handlePress = id => {
        props.setActive(id),

        list.scrollToIndex({
            index: props.data.map(d => d.id).indexOf(id),
            animated: true
        })
    }

    const handleLayout = ({nativeEvent}, id) => {
        const {width} = nativeEvent.layout
        let newSizes = sizes.filter(s => s.id !== id)

        setSizes(prev => ([...prev, {id, width}]))
    }

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Tag
                onLayout={(event) => handleLayout(event, item.id)}
                active={props.active === item.id}
                onPress={() => handlePress(item.id)}
              >
                <StyledText
                  style={{
                    color: '#fff'
                  }}
                >
                {item.title}
                </StyledText>
              </Tag>
            )}
            data={props.data}
            horizontal={true}
            getItemLayout={getItemLayout}
            ref={(ref) => { list = ref; }}
            contentContainerStyle={{
                paddingLeft: 10,
                paddingTop: 45,
            }}
        />
    )
}

export default TagsList
