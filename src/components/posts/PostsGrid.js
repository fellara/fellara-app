import React, {useEffect, useState} from 'react'
import { TouchableOpacity, Image, FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMediaQuery } from 'react-responsive'

import {renderEndReached, renderScrollToReveal, renderEmptyList} from './shared'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'
import {getImageUrl} from '../../utils/'
import Text from '../../components/typography'

const PostsGrid = props => {
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(true)
    const navigation = useNavigation()

    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-device-width: 1224px)'
    })
  
    useEffect(() => {
      if (props.forcePaginate) handlePagination()
    }, [props.forcePaginate])
    
    const handlePagination = () => {
      if (props.onPagination && !props.paginationLoading) props.onPagination()
    }    
    const handleScroll = (event) => {
      if (props.onScroll) props.onScroll(event)
    }

    const margin = 2;
    const height = ((!isDesktopOrLaptop ? layouts.window.width : MAX_WIDTH) - (20 + 6 * margin)) / 3

    const style = isDesktopOrLaptop ? {
      paddingHorizontal: (layouts.window.width - MAX_WIDTH) / 2 - POSTS_LIST_PADDING
    } : {}

    const styles = StyleSheet.create({
        MainContainer: {
          justifyContent: 'center',
          flex: 1,
          paddingTop: 30,
        },
        list: {
          paddingBottom: 150,
          ...style
        },
        imageThumbnail: {
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          width: height
        },
    });

    const renderItem = (item, margin, height, styles) => {
        if (item.mock) return <View style={{background: '#eeeeee44', flexDirection: 'column', margin, height, width: height}} />
        return (<TouchableOpacity 
          onPress={() => navigation.navigate('post', {
            tag: item.tag,
            id: item.id,
            _back: 'Profile',
          })}
          style={{ flexDirection: 'column', margin, width: height}}>
          <Image style={styles.imageThumbnail} 
            resizeMode='cover'
            source={{ uri: getImageUrl(item.clean_image_small.url)}} />
        </TouchableOpacity>
    )}

    const renderFooter = () => {
      return (!props.endReached 
        ? (props.data.length == 9 && !props.paginationLoading) 
          ? renderScrollToReveal() 
          : props.ListFooterComponent() 
        : renderEndReached()
      )
    }

    return (
        <FlatList
            data={props.data}
            onEndReached={handlePagination}
            // onEndReached={() => setCallOnScrollEnd(true)}
            // onEndReached={() => {
            //   if (!callOnScrollEnd) {
            //     setCallOnScrollEnd(true);
            //     handlePagination();
            //   }
            // }}
            // onMomentumScrollBegin={() => setCallOnScrollEnd(false)}
            onEndReachedThreshold={50}
            onScroll={handleScroll}
            renderItem={({ item }) => renderItem(item, margin, height, styles)}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={props.ListHeaderComponent}
            ListFooterComponent={() => renderFooter()}
            ListEmptyComponent={() => !props.paginationLoading && renderEmptyList(props.listEmptyText)}
            contentContainerStyle={styles.list}
        />
    )
}

export default PostsGrid