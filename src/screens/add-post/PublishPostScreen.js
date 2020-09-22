import React, {useState} from 'react'
import { Image, ScrollView, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

import layouts, {MAX_WIDTH} from '../../constants/layouts'
import {forceProfileUpdate, forceTagUpdate} from '../../actions/updates'
import Container from '../../components/layouts';
import Form from '../../components/forms'
import { createPost } from '../../api/posts'
import { makeToast } from '../../actions/toasts'

const StyledImage = styled(Image)`
    width: 100%;
    height: ${p => (!p.isDesktop ? layouts.window.width : MAX_WIDTH) * p.ratio}px;
`

const PublishPostScreen = props => {
    const [ratio, setRatio] = useState(1)
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState([])
    const [activeTag, setActiveTag] = useState(props.activeTag || tags[0].id)
    const navigation = useNavigation()

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const fields = [
        {
            label: 'Tag',
            type: 'select',
            placeholder: 'Choose a Tag',
            name: 'tag_new',
            default: props.tag || activeTag,
            disabled: props.tag && true,
            options: props.tags.map(tag => ({value: tag.id, title: tag.title})),
            required: true,
        },
    ]

    Image.getSize(props.image.uri, (width, height) => {
        setRatio(height / width)
    })

    const handleSubmit = (data) => {
        let body = data
        if (props.replyTo) body = {...body, reply_to: props.replyTo, new_tag: props.tag}
        if (props.isLoggedIn) {
            setLoading(true)
            createPost({...body, file: props.image.file}).then(res => {
                if (res.status === 201) {
                    
                    props.forceTagUpdate(data.tag_new)
                    props.forceProfileUpdate()
                    props.setImage(null)
                    if (!props.replyTo) {
                        props.makeToast('Post successfully published', 'SUCCESS')
                        navigation.navigate('Home', {tag: data.tag_new})
                    } else {
                        props.makeToast('Reply successfully published', 'SUCCESS')
                    }
                    if (props.onSucess) props.onSucess(res.data) 
                } else {
                    props.makeToast('Something went wrong, try again', 'ERROR')
                }
                setLoading(false)
            })
        } else {
            props.makeToast('Login is required')
            navigation.navigate('Profile', {_back: 'AddPost'})
        }
    }
    const isImage = props.image.file.type.split('/')[0] !== 'video'
    const imageVideoProps = isImage ? {ratio} : {}

    return (
      <SafeAreaView>
        <ScrollView style={{
                width: '100%',
                flex: 1,
                height: layouts.window.height,
            }}
            contentContainerStyle={{
                height: layouts.window.height,
                flex: 1,
                width: isDesktopOrLaptop ? MAX_WIDTH : layouts.window.width
            }}
        >
            <StyledImage
                as={isImage ? Image : Video}
                source={{ uri: props.image.uri }}
                rate={1.0}
                volume={1.0}
                isMuted={true}
                resizeMode="cover"
                shouldPlay
                isLooping
                isDesktop={isDesktopOrLaptop}
                ratio={ratio}
                // {...imageVideoProps}
            />
            <Container paddingbottom={150}>
                <Form
                    fields={fields}
                    onSubmit={handleSubmit}
                    loading={loading}
                    submitText={loading && (props.uploadProgress + '% completed...')}
                />
            </Container>
        </ScrollView>
      </SafeAreaView>
    )
}

export default connect(state => ({
    isLoggedIn: state.user.isLoggedIn,
    tags: state.initials.tags,
    activeTag: state.posts.activeTag,
    uploadProgress: state.posts.uploadProgress,
}), {
    forceProfileUpdate,
    forceTagUpdate,
    makeToast
})(PublishPostScreen)