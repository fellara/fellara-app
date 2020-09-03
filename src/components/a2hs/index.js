import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {View, Platform, Image} from 'react-native'
import { Button, CheckBox } from '@ui-kitten/components';
import { connect } from 'react-redux';

import IOS from './IOS'
import Android from './Android'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'
import {isInStandaloneMode} from '../../constants'
import {getOS} from '../../utils'
import {turnOffInstallPrompt} from '../../actions/settings'
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
    const [checked, setChecked] = React.useState(false);

    const handleDismiss = () => {
        if (checked) {
            console.log('asd');
            props.turnOffInstallPrompt()
        }
        props.setVisible(false)
    }

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
            <Button onPress={handleDismiss}>
                Ok, Got It!
            </Button>
            <CheckBox 
                checked={checked}
                onChange={nextChecked => setChecked(nextChecked)}
                style={{
                    marginTop: 15,
                }}
            >
                Don't show this page again
            </CheckBox>
        </Wrapper>
    )   
}

const A2HS = props => {
    const [visible, setVisible] = useState(true)
    return (
        (props.installPrompt && visible && !isInStandaloneMode && Platform.OS === 'web')
            ? getOS() === 'ios'
                ? <IOS setVisible={setVisible} turnOffInstallPrompt={props.turnOffInstallPrompt} />
                : getOS() === 'android'
                    ? <Android setVisible={setVisible} turnOffInstallPrompt={props.turnOffInstallPrompt} />
                    : null
            : null
    )   
}

export default connect(state => ({installPrompt: state.settings.installPrompt}), {turnOffInstallPrompt})(A2HS)