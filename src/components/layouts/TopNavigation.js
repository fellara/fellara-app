import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

const BackIcon = (props) => (
  !props.noBack
    ? <Icon {...props} name='arrow-back'/>
    : <Icon />
);

const renderBackAction = (props) => {
  return (
    
    <TopNavigationAction icon={BackIcon} 
      onPress={props.onBack}
    />
  )
};

const renderNoBack = (props) => {
  return (
    <View style={{
      marginLeft: 10,
    }} />
  )
};

const CustomTopNavigation = (props) => {
    const navigation = useNavigation();
    
    return (<TopNavigation
        accessoryLeft={() => !props.noBack ? renderBackAction(props) : renderNoBack()}
        accessoryRight={props.accessoryRight && props.accessoryRight}
        title={props.title}
        onBack={props.onBack}
    />
)};

export default CustomTopNavigation