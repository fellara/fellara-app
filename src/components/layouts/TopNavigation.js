import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const renderBackAction = (props) => (
    <TopNavigationAction icon={BackIcon} onPress={props.onBack}/>
  );

const CustomTopNavigation = (props) => {
    const navigation = useNavigation();

    return (<TopNavigation
        accessoryLeft={renderBackAction}
        title={props.title}
        onBack={props.onBack}
    />
)};

export default CustomTopNavigation