import React from 'react'
import { View, ScrollView} from 'react-native'
import styled from 'styled-components'

const StyledContainer = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 40px;
`

const Container = props => (<StyledContainer {...props}>{props.children}</StyledContainer>)

export default Container