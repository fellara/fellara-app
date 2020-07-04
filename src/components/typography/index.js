import React from 'react';
import { Text } from '@ui-kitten/components';
import styled from 'styled-components'

const StyledHeading = styled(CustomText)`
    ${p => p.marginBottom && `margin-bottom: 15px`};
`

const StyledSubheading = styled(CustomText)`
    ${p => p.marginBottom && `margin-bottom: 15px`};
`

export default function CustomText(props) {
    return <Text {...props} appearance={'default'} />;
}

export const Heading = (props) => {
    return <StyledHeading {...props} category='h3' />
}
export const Subheading = (props) => {
    return <StyledSubheading {...props} category='s1' />
}
