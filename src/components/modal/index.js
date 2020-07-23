import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";

import Modal from 'modal-enhanced-react-native-web';

const CustomModal = props => {
  const [visible, setVisible] = useState(props.visible)
  
  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])
  
  const handleHide = () => {
    setVisible(false)
    if (props.onHide) props.onHide()
  }
  return (
  <Modal
    isVisible={visible}
    onBackdropPress={handleHide}
  >
    {props.children}
  </Modal>
  );
}

export default CustomModal