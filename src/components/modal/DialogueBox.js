import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import {Layout} from '@ui-kitten/components'
import styled from 'styled-components/native'
import { useMediaQuery } from 'react-responsive'

import Modal from './';
import Text, {Heading, Subheading} from '../typography'
import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'

const Wrapper = styled(Layout)`
  width: ${p => p.isDesktop ? MAX_WIDTH + `px` : `90%`};
  min-height: 100;
  align-self: center;
  border-radius: 10px;
`

const Body = styled(View)`
  padding: 20px;
`

const Button = styled(TouchableOpacity)`
  padding: 15px;
  flex: 1;
  text-align: center;
  ${p => !p.last && `
    border-right-color: #ccc;
    border-right-width: 1px;
  `}
`

const Buttons = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  border-top-color: #ccc;
  border-top-width: 1px;
`

const DialogueBox = props => {
  const [visible, setVisible] = useState(props.visible)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])
  
  const handleButtonPress = (onPress) => {
    onPress();
    setVisible(false);
  }

  const style = props.comp ? {marginBottom: 10} : {}

  return ( <Modal
    visible={visible}
    onHide={props.onHide}
  >
    <Wrapper
      isDesktop={isDesktopOrLaptop}
    >
      <Body>
        <Heading style={{
          marginBottom: 10,
        }}>{props.title}</Heading>
        <Text style={{
          ...style
        }}>{props.description}</Text>
        {props.comp && props.comp}
      </Body>
      {props.buttons && <Buttons>
        {props.buttons?.map((button, index) => <Button key={index} 
            last={props.buttons.length - 1 === index}
            onPress={() => handleButtonPress(button.onPress)}
          >
            <Text>{button.title}</Text>
          </Button>)}
      </Buttons>}
    </Wrapper>
  </Modal>
  );
}

export default DialogueBox