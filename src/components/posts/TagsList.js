import React, {useRef, useState, useEffect} from 'react'
import { SafeAreaView, TouchableOpacity, FlatList, View } from 'react-native'
import { Avatar} from '@ui-kitten/components'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { setActiveTag } from '../../actions/posts'
import Text, {Muted} from '../typography';
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'
import Logo from '../../assets/images/logo_thumbnail.jpg'

const Tag = styled(TouchableOpacity)`
  background: ${p => p.active ? '#222' : '#fff'};
  ${p => !p.active && 'border: 1px solid #b1b1b1'};
  margin-right: 10px;
  border-radius: 20px;
  height: 35px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
`

const StyledText = styled(Text)`
  color: ${p => !p.active ? '#444' : '#fff'};
`

const STextWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-right: 10px;
  flex-direction: row;
`

const TextWrapper = props => {
  <STextWrapper>{props.children}</STextWrapper>
}

const TagsList = props => {
    let list = useRef();
    const [sizes, setSizes] = useState([])

    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-device-width: 1224px)'
    })

    useEffect(() => {
      if (props.active) {
        list.scrollToIndex({
          index: props.data.map(d => d.id).indexOf(parseInt(props.active)),
          animated: true
        })
      }
    }, [props.active])

    const getItemLayout = (data, index) => {
        let current = data[index]
        const length = 85
        // const length = sizes.find(s => current.id === s.id)?.width || 70
        return({ length: (length), offset: (length - 15) * index, index })
    }

    const handlePress = id => {
        props.setActive(id),
        props.setActiveTag(id)
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

    const renderBrand = () => {
        return (
          <STextWrapper>
            <Avatar source={Logo} size='small' style={{
              marginRight: 5,
            }} />
            <Text category='h6'>fellara</Text>
          </STextWrapper>
        )
    }

    const style = isDesktopOrLaptop ? {
      paddingHorizontal: (layouts.window.width - MAX_WIDTH) / 2 - POSTS_LIST_PADDING
      // marginLeft: (layouts.window.width - MAX_WIDTH) / 2 - POSTS_LIST_PADDING
    } : {}

    return (
      <SafeAreaView>
        <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Tag
                onLayout={(event) => handleLayout(event, item.id)}
                active={props.active === item.id}
                onPress={() => handlePress(item.id)}
              >
                <StyledText
                  active={props.active === item.id}
                >
                {item.title}
                </StyledText>
              </Tag>
            )}
            data={props.data}
            horizontal={true}
            getItemLayout={getItemLayout}
            ref={(ref) => { list = ref}}
            ListHeaderComponent={() => renderBrand()}
            // ListFooterComponent={() => props.data.length > 0 && <STextWrapper><Muted>the end</Muted></STextWrapper>}
            contentContainerStyle={{
              paddingLeft: 10,
              paddingTop: 10,
              ...style
            }}
        />
      </SafeAreaView>
    )
}

export default connect(null, {setActiveTag})(TagsList)
