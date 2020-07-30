import React from 'react'
import { TouchableOpacity, View, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import layouts from '../../constants/layouts'
import {getImageUrl} from '../../utils/'

const PostsGrid = props => {
    const navigation = useNavigation()
    
    const handlePagination = () => {
        if (props.onPagination) props.onPagination()
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

    return (
        <FlatList
            data={props.data}
            onEndReached={handlePagination}
            onEndReachedThreshold={50}
            onScroll={handleScroll}
            renderItem={({ item }) => renderItem(item, margin, height, styles)}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={props.ListHeaderComponent}
            ListFooterComponent={props.ListFooterComponent}
            contentContainerStyle={styles.list}
        />
    )
}

export default PostsGrid