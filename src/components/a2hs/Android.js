import React from 'react'
import Svg, { G, Path } from "react-native-svg";
import { Icon } from '@ui-kitten/components';

import {Body} from './'

const AndroidMenu = () => (
    <Icon name='more-vertical-outline' style={{
        width: 30,
        height: 30,
    }} />
)

const AndroidPlus = () => (
    <Icon name='plus-outline' style={{
        width: 30,
        height: 30,
    }} />
)

const IOSAdd = () => (
    <Svg width={30} height={30} color="#333" viewBox="0 0 24 24">
        <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
            d="M2.19 16.875l.911-2.708h3.612l.912 2.708h1.19l-3.35-9.463H4.348L1 16.875h1.19zm4.19-3.711H3.434L4.857 8.94h.1l1.422 4.224zM12.09 17c.938 0 1.743-.466 2.17-1.252h.101v1.127h1.033V7h-1.083v3.92h-.095c-.383-.773-1.182-1.239-2.126-1.239-1.724 0-2.85 1.443-2.85 3.66 0 2.223 1.114 3.659 2.85 3.659zm.252-1.017c-1.24 0-1.982-.99-1.982-2.642 0-1.646.749-2.643 1.982-2.643 1.226 0 1.994 1.023 1.994 2.643 0 1.633-.76 2.642-1.994 2.642zM19.697 17c.937 0 1.743-.466 2.17-1.252h.101v1.127H23V7h-1.082v3.92h-.094c-.385-.773-1.183-1.239-2.127-1.239-1.724 0-2.85 1.443-2.85 3.66 0 2.223 1.114 3.659 2.85 3.659zm.251-1.017c-1.239 0-1.982-.99-1.982-2.642 0-1.646.75-2.643 1.982-2.643 1.228 0 1.995 1.023 1.995 2.643 0 1.633-.761 2.642-1.994 2.642z"
            fill="#007AFF"
            fillRule="nonzero"
        />
        </G>
    </Svg>
)

const ANDROID_STEPS = [
    {
        icon: AndroidMenu,
        text: 'Press the menu button'
    }, 
    {
        icon: AndroidPlus,
        text: 'Select "Add to Home Screen"'
    }, 
    {
        icon: IOSAdd,
        text: 'Select "Add"'
    },
]

const Android = ({setVisible}) => {

    return (
        <Body
            steps={ANDROID_STEPS}
            setVisible={setVisible}
        />
    )   
}

export default Android