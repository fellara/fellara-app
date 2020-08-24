import React, {useState, useEffect} from 'react'
import { View, Image, ScrollView, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import {connect} from 'react-redux'

import layouts from '../../constants/layouts'
import {forceProfileUpdate, forceTagUpdate} from '../../actions/updates'
import Container from '../../components/layouts';
import Form from '../../components/forms'
import { getTags, createPost } from '../../api/posts'
import { makeToast } from '../../actions/toasts'

const StyledImage = styled(Image)`
    width: ${layouts.window.width}px;
    height: ${p => layouts.window.width * p.ratio}px;
`

const PublishPostScreen = props => {
    const [ratio, setRatio] = useState(1)
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState([])
    const [activeTag, setActiveTag] = useState(props.activeTag || tags[0].id)

    const fields = [
        {
            label: 'Tag',
            type: 'select',
            placeholder: 'Choose a Tag',
            name: 'tag',
            default: activeTag,
            options: props.tags.map(tag => ({value: tag.id, title: tag.title})),
            required: true,
        },
    ]

    Image.getSize(props.image.uri, (width, height) => {
        setRatio(height / width)
    })

    const handleSubmit = (data) => {
        if (props.isLoggedIn) {
            setLoading(true)
            createPost({...data, image: props.image.file}).then(res => {
                if (res.status === 201) {
                    props.makeToast('Post successfully published', 'SUCCESS')
                    props.forceTagUpdate(data.tag)
                    props.forceProfileUpdate()
                    props.setImage(null)
                    props.navigation.navigate('Home', {tag: data.tag})
                } else {
                    props.makeToast('Something went wrong, try again', 'ERROR')
                }
                setLoading(false)
        })
        } else {
            props.makeToast('Login is required')
            props.navigation.navigate('Profile', {_back: 'AddPost'})
        }
    }

    return (
      <SafeAreaView>
        <ScrollView style={{
                width: '100%',
                flex: 1,
                height: layouts.window.height,
            }}
            contentContainerStyle={{
                height: layouts.window.height,
            }}
        >
            <StyledImage source={{uri: props.image.uri}} ratio={ratio} />
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