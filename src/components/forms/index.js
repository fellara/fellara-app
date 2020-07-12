import React, { useState, useEffect } from 'react'
import {View} from 'react-native'
import styled from 'styled-components/native'
import { Button, Icon, Card, Spinner, Divider } from '@ui-kitten/components';

import Label from './Label';
import Input from './Input'
import Image from './Image'
import Select from './Select'
import DatePicker from './DatePicker';
import Autocomplete from './Autocomplete';
import {checkRegex} from '../../utils';
import Text from '../../components/typography'

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
        setForm(form => ({...form, [name]: value}))
    }

    const validateFields = () => {
        let tempErrors = []
        props.fields.forEach(field => {
            if (field.required && !form[field.name]) {
                tempErrors = [...tempErrors, {type: 'EMPTY', field: field.name}]
            } else if (field.regex && !checkRegex(form[field.name], field.regex)) {
                tempErrors = [...tempErrors, {type: 'REGEX', field: field.name}]
            } else if (field.validator && !field.validator(form)) {
                tempErrors = [...tempErrors, {type: 'CUSTOM', field: field.name}]
            }
        });

        setErrors(tempErrors)
        if (tempErrors.length > 0) return false;
        else return true;
    }

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
                        :  field.type === 'autocomplete'
                            ? <Autocomplete 
                                {...field}
                                data={form}
                                onChange={(value) => handleChange(value, field.name)}
                            />
                            : <Input
                                {...field}
                                onChange={(value) => handleChange(value, field.name)}
                            />}
                
                    {errors
                        .filter(error => error.type === 'EMPTY')
                        .map(error => error.field)
                        .includes(field.name) && <Label isError>This field is required!</Label>}
                    {errors
                        .filter(error => error.type === 'CUSTOM')
                        .map(error => error.field)
                        .includes(field.name) && <Label isError>{field.validatorError}</Label>}
                    {errors
                        .filter(error => error.type === 'REGEX')
                        .map(error => error.field)
                        .includes(field.name) && <Label isError>{field.regexError || 'This field is not valid!'}</Label>}
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
            {errors.length > 0 && <Label isError>Fix errors shown above!</Label>}
            {
                // errors.length > 0 && <Card status='danger' style={{
                //     marginTop: 15,
                // }}>
                //     <Text>{'These fields must not be empty:'}</Text>
                //     <Label isError>
                //         {
                //         errors
                //             .filter(error => error.type === 'EMPTY')
                //             .map((error, index) => error.field + (index !== errors.length - 1 ? ', ' : ''))
                //         }
                //     </Label>
                //     <Divider/>
                //     <Text>{'These fields are not valid:'}</Text>
                //     <Label isError>
                //         {
                //         errors
                //             .filter(error => error.type === 'REGEX')
                //             .map((error, index) => error.field + (index !== errors.length - 1 ? ', ' : ''))
                //         }
                //     </Label>
                // </Card>
            }
        </View>
    )
}

export default Form