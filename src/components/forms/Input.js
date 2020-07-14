import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

const CustomInput = (props) => {
    const [value, setValue] = React.useState(props.value || props.default);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (p) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...p} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const handleChange = (val) => {
        setValue(val)
        props.onChange(val)
    }

    return (
        <>
            <Input
                value={value}
                status={props.status}
                placeholder={props.placeholder}
                caption={props.caption}
                accessoryRight={props.type === 'password' && renderIcon}
                captionIcon={props.caption && AlertIcon}
                secureTextEntry={props.type === 'password' && secureTextEntry}
                onChangeText={handleChange}
                blurOnSubmit={false}
            />
        </>
    );
};

export default CustomInput
