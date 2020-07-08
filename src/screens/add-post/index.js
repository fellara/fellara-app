import React, {useEffect, useState} from 'react';
import { Layout, Icon } from '@ui-kitten/components';
import styled from 'styled-components/native';

import layouts from '../../constants/layouts'
import TopNavigation from '../../components/layouts/TopNavigation'
import Dots from '../../components/add-post/Dots'
import {Muted} from '../../components/typography'
import ImagePicker from '../../components/forms/Image'
import PublishPostScreen from './PublishPostScreen';

const StyledButton = styled(ImagePicker)`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-color: #eee;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    margin-bottom: 75px;
`

const StyledLayout = styled(Layout)`
    justify-content: center;
    align-items: center;
`

const AddPostScreen = (props) => {
    const [image, setImage] = useState(null)

    const handleChange = (file, uri) => {
        setImage({file, uri})
    }
    console.log(image);
    
    return (<>
      {image && <TopNavigation />}
      <StyledLayout
        style={{height: layouts.window.height}}
      >
        {!image ? <>
            <Dots />
            <StyledButton onChange={handleChange}/>
            <Muted>Tap on the plus to add a photo</Muted>
        </> : <PublishPostScreen image={image} setImage={setImage} />}
      </StyledLayout>
    </>
  )
}

export default AddPostScreen
