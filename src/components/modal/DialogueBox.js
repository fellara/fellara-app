import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import {Layout} from '@ui-kitten/components'
import styled from 'styled-components/native'

import Modal from './';
import Text, {Heading, Subheading} from '../typography'

const Wrapper = styled(Layout)`
  width: 90%;
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
  
  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])
  
  const handleButtonPress = (onPress) => {
    onPress();
    setVisible(false);
  }

  return (
  <Modal
    visible={visible}
    onHide={props.onHide}
  >
    <Wrapper>
      <Body>
        <Heading style={{
          marginBottom: 10,
        }}>{props.title}</Heading>
        <Text>{props.description}</Text>
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