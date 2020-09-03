import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {View, Platform, Image} from 'react-native'
import { Button } from '@ui-kitten/components';

import IOS from './IOS'
import Android from './Android'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'
import {isInStandaloneMode} from '../../constants'
import {getOS} from '../../utils'
import Logo from '../../assets/images/logo.jpg'
import Text, {Heading, Subheading, Muted} from '../typography'

export const Wrapper = styled(View)`
    width: ${layouts.window.width}px;
    height: ${layouts.window.height}px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
`

const Step = ({step, text, index}) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        }}>
            <Subheading style={{
                fontSize: 15,
                marginRight: 15
            }}>{index + 1}</Subheading>
            <step.icon />
            <Text style={{
                marginLeft: 15,
            }}>{step.text}</Text>
        </View>
    )
}

export const Body = props => {
    return (
        <Wrapper>
            <Image source={Logo} style={{
                width: 70,
                height: 70,
                marginBottom: 10,
            }} />
            <Subheading style={{
                marginBottom: 45,
                fontSize: 20,
            }}>Install fellara</Subheading>
            <View style={{
                justifyContent: 'flex-start',
                marginBottom: 15,
                // backgroundColor: '#eee',
                // borderRadius: 15,
                // padding: 15,
            }}>
                {
                    props.steps?.map((step, index) => <Step step={step} index={index} key={index} />)
                }
            </View>
            <Button onPress={() => props.setVisible(false)}>
                Ok, Got It!
            </Button>
        </Wrapper>
    )   
}

const A2HS = props => {
    const [visible, setVisible] = useState(true)
    return (
        (visible && !isInStandaloneMode && Platform.OS === 'web')
            ? getOS() === 'ios'
                ? <IOS setVisible={setVisible} />
                : getOS() === 'android'
                    ? <Android setVisible={setVisible} />
                    : <Android setVisible={setVisible} />
            : null
    )   
}

export default A2HS