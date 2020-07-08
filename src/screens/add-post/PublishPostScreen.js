import React, {useState, useEffect} from 'react'
import { View, Image } from 'react-native'
import styled from 'styled-components/native'

import layouts from '../../constants/layouts'
import Container from '../../components/layouts';
import Form from '../../components/forms'
import { getTags, createPost } from '../../api/posts'

const StyledImage = styled(Image)`
    width: ${layouts.window.width}px;
    height: ${p => layouts.window.width * p.ratio}px;
`
  
const PublishPostScreen = props => {
    const [ratio, setRatio] = useState(1)
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState([])
    const [activeTag, setActiveTag] = useState(null)

    const fields = [
        {
            label: 'Tag',
            type: 'select',
            placeholder: 'Choose a Tag',
            name: 'tag',
            // default: activeTag,
            options: tags,
            required: true,
        },
    ]

    Image.getSize(props.image.uri, (width, height) => {
        setRatio(height / width)
    })

    useEffect(() => {
        getTags().then(res => {
            setTags(res.data.map(t => ({title: t.title, value: t.id})))
            setActiveTag(res.data[0].id)
          })
    }, [])

    const handleSubmit = (data) => {
        setLoading(true)
        createPost({...data, image: props.image.file}).then(res => {
            console.log(res);
            setLoading(false)
            props.setImage(null)
        })
    }

    return (
        <View style={{
            width: '100%',
            flex: 1,
        }}>
            <StyledImage source={{uri: props.image.uri}} ratio={ratio} />
            <Container>
                <Form 
                    fields={fields}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            </Container>
            
        </View>
    )
}

export default PublishPostScreen