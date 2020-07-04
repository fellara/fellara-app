import React, { useState, useEffect } from 'react'
import {View} from 'react-native'
import styled from 'styled-components'
import { Button, Icon, Layout, Spinner } from '@ui-kitten/components';

import Input from './Input'

const StyledButton = styled(Button)`
    margin-top: 10px;
`

const LoadingIndicator = (props) => (
    <View>
        <Spinner size='small' 
            status='control'
        />
    </View>
);

const Form = ({loading, ...props}) => {
    const [form, setForm] = useState({})
    // const [loading, setLoading] = useState(false)

    useEffect(() => {
        setForm(form => {
            let data = {}
            props.fields.forEach(field => {
                data = {...data, [field.name]: null}
            });

            return data
        })
    }, [])

    const handleSubmit = () => {
        if (!validateFields()) return

        if (props.onSubmit) props.onSubmit(form)
    }

    const handleChange = (value, name) => {
        setForm(form => ({...form, [name]: value}))
    }

    const validateFields = () => {
        return true
    }


    return (
        <View>
            {props.fields.map(field => {
                return (<Input
                        {...field}
                    onChangeText={(value) => handleChange(value, field.name)}
                    />)
            })}

            <StyledButton 
                status='primary' 
                onPress={handleSubmit}
                accessoryLeft={loading && LoadingIndicator}
                disabled={loading}
            >
                {props.submitText || 'Submit'}
            </StyledButton>
        </View>
    )
}

export default Form