import React, {useEffect, useState} from 'react'
import { TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {renderEndReached, renderScrollToReveal} from './shared'
import layouts from '../../constants/layouts'
import {getImageUrl} from '../../utils/'

const PostsGrid = props => {
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(true)
    const navigation = useNavigation()

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
    const height = (layouts.window.width - (20 + 6 * margin)) / 3

    const styles = StyleSheet.create({
        MainContainer: {
          justifyContent: 'center',
          flex: 1,
          paddingTop: 30,
        },
        list: {
          paddingBottom: 150,
        },
        imageThumbnail: {
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          width: height
        },
    });

    const renderItem = (item, margin, height, styles) => {
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
            contentContainerStyle={styles.list}
        />
    )
}

export default PostsGrid