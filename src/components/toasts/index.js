import React, {useRef, useEffect, useState} from 'react';
import {connect} from 'react-redux'
import Toast from '@rimiti/react-native-toastify';

import {theme} from '../../../theme'

const TYPES = [
    {
        value: 0,
        name: 'INFO',
        color: theme['color-primary-500'],
    },
    {
        value: 1,
        name: 'ERROR',
        color: theme['color-danger-500'],
    },
    {
        value: 2,
        name: 'SUCCESS',
        color: theme['color-success-500'],
    },
]

const CToast = props => {
    let toastify = useRef()
    const [type, setType] = useState(TYPES[0])

    useEffect(() => {
        if (props.toasts[0]) {
            setType(TYPES.find(t => t.name === props.toasts[0].type) || TYPES[0])
            handleToast(props.toasts[0])
        }
    }, [props.toasts])

    const handleToast = (toast) => {
        if (toast) toastify.current.show(toast.text, 1000)
    }

    return (
        <Toast 
            ref={toastify} 
            style={{
                backgroundColor: type.color
            }}
        />
    )
}

export default connect(state => ({toasts: state.toasts}))(CToast)