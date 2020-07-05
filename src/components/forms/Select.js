import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

const CustomSelect = (props) => {
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
        <Input
            value={value}
            label={label}
            placeholder={props.placeholder}
            caption={props.caption}
            accessoryRight={props.type === 'password' && renderIcon}
            captionIcon={props.caption && AlertIcon}
            secureTextEntry={props.type === 'password' && secureTextEntry}
            onChangeText={props.onChangeText}
        />
    );
};

export default CustomSelect