import React from 'react';
import { Text } from '@ui-kitten/components';
import styled from 'styled-components/native'

const StyledText = styled(Text)`
    margin: ${p => p.error ? '0' : '10'}px 0 5px;
    ${p => p.isError && 'color: red;'}
`

const Label = props => {
    return (
        <StyledText {...props} category='label'>{props.children}</StyledText>
    )
}

export default Label