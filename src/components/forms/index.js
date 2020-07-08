import React, { useState, useEffect } from 'react'
import {View} from 'react-native'
import styled from 'styled-components/native'
import { Button, Icon, Layout, Spinner } from '@ui-kitten/components';

import Label from './Label';
import Input from './Input'
import Image from './Image'
import Select from './Select'
import DatePicker from './DatePicker';

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
                data = {...data, [field.name]: field.default || null}
            });

            return data
        })
    }, [])

    const handleSubmit = () => {
        // Validation commented in order to test the process.
        // Must get uncommented as soon as the tests are gone.
        if (!validateFields()) return
        const cleanedForm = Object.entries(form).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {})

        if (props.onSubmit) props.onSubmit(cleanedForm)
    }

    const handleChange = (value, name) => {
        console.log('value, name', value, name);
        
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
                let label = field.label
                if (field.required) label += ' *';

                return (<React.Fragment key={field.name}>
                <Label>{label}</Label>
                {field.type === 'image'
                ? <Image 
                    {...field}
                    onChange={(value) => handleChange(value, field.name)}
                />
                : field.type === 'select'
                    ? <Select 
                        {...field}
                        onChange={(value) => handleChange(value, field.name)}
                    />
                    :  field.type === 'date'
                        ? <DatePicker 
                            {...field}
                            onChange={(value) => handleChange(value, field.name)}
                        />
                        : <Input
                            {...field}
                            onChange={(value) => handleChange(value, field.name)}
                        />}
                
                    {errors
                        .filter(error => error.type === 'EMPTY')
                        .map(error => error.field)
                        .includes(field.name) && <Label isError>* This field is required!</Label>}
                </React.Fragment>)
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