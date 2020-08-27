import React, {useState, useEffect} from 'react'
import { ScrollView } from 'react-native'
import {connect} from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import Form from '../../components/forms'
import {updateProfile, getCountries, getCities} from '../../api/user'
import Container from '../../components/layouts';
import {setProfile} from '../../actions/user'
import TopNavigation from '../../components/layouts/TopNavigation'
import { makeToast } from '../../actions/toasts'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'

const EditProfileScreen = ({profile, ...props}) => {
    const [loading, setLoading] = useState(false)

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    
    const style = isDesktopOrLaptop ? {
        width: MAX_WIDTH,
        marginLeft: (layouts.window.width - MAX_WIDTH) / 2 - POSTS_LIST_PADDING
    } : {}

    const fields = [
        {
            label: 'Avatar',
            type: 'image',
            name: 'profile_image',
            required: true,
            value: profile.profile_image_small
        },   
        {
            label: 'First Name',
            placeholder: 'John',
            type: 'text',
            name: 'first_name',
            required: true,
            value: profile.first_name
        },  
        {
            label: 'Last Name',
            placeholder: 'White',
            type: 'text',
            name: 'last_name',
            required: true,
            value: profile.last_name
        }, 
        {
            label: 'Country',
            placeholder: 'United States',
            type: 'autocomplete',
            name: 'country',
            loadOptions: (query) => getCountries(query || profile.country),
            required: true,
            value: profile.country
        },  
        {
            label: 'City',
            placeholder: 'NYC',
            type: 'autocomplete',
            name: 'city',
            loadOptions: (query, data) => getCities(query || profile.city, data.country || profile.country),
            selectTextOnFocus: false,
            // disabled: (data) => data.country,
            required: true,
            value: profile.city
        }, 
        {
            label: 'Gender',
            type: 'select',
            name: 'gender',
            options: [
                {title: 'Male', value: 1},
                {title: 'Female', value: 2},
                {title: 'Non-Binary', value: 3},
                {title: 'Prefer Not to Disclose', value: 4},
            ],
            value: profile.gender
        }, 
        {
            label: 'Birth Date',
            placeholder: 'Pick Date',
            type: 'date',
            name: 'date_of_birth',
            value: profile.date_of_birth
        }, 
    ]
    const handleSubmit = (data) => {
      setLoading(true)
      updateProfile(data).then(res => {
        if (res.status < 300) {
            props.makeToast('Profile updated successfully', 'SUCCESS')
            props.setProfile(res.data)
            props.setEditing(false)
        } else if (res.status < 500) {
            props.makeToast(res.data.detail, 'ERROR')
        } else {
            props.makeToast('Something went wrong, try again', 'ERROR')
        }
        setLoading(false)
      }).catch(err => {
        setLoading(false)
      })
    }

    return (
        <Container as={ScrollView}
              contentContainerStyle={{
                paddingBottom: 150,
                ...style
              }}
            >
            <Form
                fields={fields}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </Container>
    )
}

export default connect(null, {setProfile, makeToast})(EditProfileScreen)