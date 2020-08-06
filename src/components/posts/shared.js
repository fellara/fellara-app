
import React, {useEffect, useRef} from 'react'
import { View } from 'react-native';
import { Icon } from '@ui-kitten/components';

import {Muted} from '../typography'

export const renderScrollToReveal = (props) => {
    const pulseIconRef = useRef();
    
    useEffect(() => {
        if (pulseIconRef.current) pulseIconRef.current.startAnimation();
    }, [pulseIconRef.current]);
  
    return (<View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
        }}
    >
        <Muted>Scroll To Reveal</Muted>
        <View
            style={{
                width: 20,
                marginTop: 5,
            }}
        >
        <Icon
            {...props}
            ref={pulseIconRef}
            animationConfig={{ cycles: Infinity }}
            name='arrowhead-down-outline'
            animation='pulse'
        />
        </View>
    </View>
)}

export const renderEndReached = (props) => (
    <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
        }}
    >
        <Muted>You've reached the end</Muted>
    </View>
);
