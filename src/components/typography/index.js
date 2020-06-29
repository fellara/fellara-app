import React from 'react';
import { Text } from '@ui-kitten/components';
import styled from 'styled-components'

const StyledHeader = styled(CustomText)`
    ${p => p.marginBottom && `margin-bottom: 15px`};
`

const StyledSubheader = styled(CustomText)`
    ${p => p.marginBottom && `margin-bottom: 15px`};
`

export default function CustomText(props) {
    return <Text {...props} appearance={'default'} />;
}

export const Header = (props) => {
    return <StyledHeader {...props} category='h3' />
}
export const Subheader = (props) => {
    return <StyledSubheader {...props} category='s1' />
}
