import React, { useState, useEffect } from 'react'
import {View} from 'react-native'
import styled from 'styled-components'
import { Button, Icon, Layout, Spinner } from '@ui-kitten/components';

import Input from './Input'
import Image from './Image'

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
    const [errors, setErrors] = useState([])
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
        console.log(name, value);
        
        setForm(form => ({...form, [name]: value}))
    }

    const validateFields = () => {
        let tempErrors = []
        props.fields.forEach(field => {
            if (field.required && !form[field.name]) {
                tempErrors = [...tempErrors, {type: 'EMPTY', field: field.name}]
            }
        });

        setErrors(tempErrors)
        if (tempErrors.length > 0) return false;
        else return true;
    }

    console.log(form);
    
    

    return (
        <View>
            {props.fields.map(field => {
                return (field.type === 'image'
                ? <Image 
                    {...field}
                    onChange={(value) => handleChange(value, field.name)}
                />
                : <Input
                    {...field}
                    onChange={(value) => handleChange(value, field.name)}
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