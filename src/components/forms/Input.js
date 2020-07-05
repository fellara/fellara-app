import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';
import Label from './Label';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

const CustomInput = (props) => {
    const [value, setValue] = React.useState(null);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (p) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...p} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    let label = props.label
    if (props.required) label += ' *';

    return (
        <>
            <Label>{label}</Label>
            <Input
                value={value}
                placeholder={props.placeholder}
                caption={props.caption}
                accessoryRight={props.type === 'password' && renderIcon}
                captionIcon={props.caption && AlertIcon}
                secureTextEntry={props.type === 'password' && secureTextEntry}
                onChangeText={props.onChange}
            />
        </>
    );
};

export default CustomInput