import React from 'react';
import { Text } from '@ui-kitten/components';

const Label = props => {
    return (
        <Text {...props} category='label'>{props.children}</Text>
    )
}

export default Label