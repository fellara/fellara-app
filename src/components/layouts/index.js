import React from 'react'
import { View, ScrollView } from 'react-native'
import styled from 'styled-components/native'

const StyledContainer = styled(View)`
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  margin-bottom: 0px;
  min-height: 40px;

  ${p => p.paddingbottom && `padding-bottom: ${p.paddingbottom}px`};
  ${p => (p.center && p.as !== ScrollView) && `align-items: center`};
  ${p => p.nopadding && `padding: 0; margin: 0`};
`

const Container = props => (
  <StyledContainer {...props}>{props.children}</StyledContainer>
)

export default Container
